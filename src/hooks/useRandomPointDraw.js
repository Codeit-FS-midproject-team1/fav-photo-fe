"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { drawRandomPoints } from "@/lib/api/randomPoints.js";
import { ApiError } from "@/lib/api.js";

const STORAGE_PREFIX = "fav-photo:random-point:pending:";

const getKstDate = () =>
  new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);

export function useRandomPointDraw() {
  const { user, accessToken, setUser } = useAuth();

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [limitReached, setLimitReached] = useState(null);

  const exhausted =
    limitReached?.userId === user?.id && limitReached?.kstDate === getKstDate();

  const visibleResult =
    result?.userId === user?.id && result?.kstDate === getKstDate()
      ? result.data
      : null;

  const drawingRef = useRef(false);

  const draw = async () => {
    // 동일한 화면에서 연속 클릭 방지
    if (drawingRef.current) return null;

    if (!accessToken || !Number.isSafeInteger(user?.id)) {
      setError("로그인이 필요합니다.");
      return null;
    }

    if (exhausted) {
      setError("오늘의 랜덤 포인트 뽑기 횟수를 모두 사용했습니다.");
      return null;
    }

    drawingRef.current = true;
    setLoading(true);
    setError("");

    // 사용자별로 요청 키를 분리
    // 서버의 KST 일일 초기화 기준과 동일하게 날짜 계산
    const kstDate = getKstDate();

    const storageKey = `${STORAGE_PREFIX}${user.id}:${kstDate}`;

    try {
      // 이전 요청의 결과가 불확실하면 같은 키 사용
      let idempotencyKey = sessionStorage.getItem(storageKey);

      if (!idempotencyKey) {
        idempotencyKey = crypto.randomUUID();
        sessionStorage.setItem(storageKey, idempotencyKey);
      }

      const data = await drawRandomPoints(accessToken, idempotencyKey);

      // 성공 응답을 확인한 후에만 키 제거
      sessionStorage.removeItem(storageKey);

      setResult({
        userId: user.id,
        kstDate,
        data,
      });

      if (data.randomPoint.used >= data.randomPoint.limit) {
        setLimitReached({
          userId: user.id,
          kstDate,
        });
      }

      // 공통 헤더에도 최신 포인트 잔액 반영
      setUser((previousUser) => {
        if (!previousUser || previousUser.id !== user.id) {
          return previousUser;
        }

        return {
          ...previousUser,
          points: data.points,
        };
      });

      return data;
    } catch (err) {
      const isApiError = err instanceof ApiError;

      const isDailyLimitError =
        isApiError &&
        err.status === 409 &&
        err.message === "오늘의 랜덤 포인트 뽑기 횟수를 모두 사용했습니다.";

      const isKeyConflict =
        isApiError &&
        err.status === 409 &&
        err.message === "이미 다른 포인트 처리에 사용된 요청 ID입니다.";

      if (isDailyLimitError) {
        setLimitReached({
          userId: user.id,
          kstDate,
        });
      }

      // 지급되지 않았음이 명확한 오류에서는 요청 키 제거
      const isDefinitiveFailure =
        isApiError &&
        ([400, 401, 403, 404].includes(err.status) ||
          isDailyLimitError ||
          isKeyConflict);

      if (isDefinitiveFailure) {
        sessionStorage.removeItem(storageKey);
      }

      // 네트워크 오류 및 불확실한 서버 오류는 기존 키 유지
      setError(
        err instanceof Error ? err.message : "랜덤 포인트 뽑기에 실패했습니다.",
      );

      return null;
    } finally {
      drawingRef.current = false;
      setLoading(false);
    }
  };

  return {
    draw,
    result: visibleResult,
    error,
    loading,
    exhausted,
  };
}
