"use client";

import { useEffect, useState } from "react";
import { getMySales } from "@/lib/api/users.js";
import { useAuth } from "@/contexts/AuthContext.jsx";

// 서버 응답 items[] 한 줄 → CardTile이 쓰는 card 모양으로 바꾼다
const toTileCard = (item) => ({
  key: `${item.type}-${item.id}`, // 판매글 id와 제안 id가 겹칠 수 있어 type을 붙인다
  type: item.type,
  status: item.status,
  id: item.photoCard.id,
  imageUrl: item.photoCard.imageUrl,
  name: item.photoCard.name,
  method: item.photoCard.method,
  genre: item.photoCard.genre,
  description: item.photoCard.description,
  nickname: item.photoCard.creator.nickname,
  price: item.photoCard.price,
  quantity: item.quantity, // 판매 등록 수량 중 남은 장수 (교환 제안은 항상 1)
});

const EMPTY = { cards: [], pagination: null, summary: null };

export default function useMySales({
  keyword = "",
  method = null,
  genre = null,
  status = null,
  sort,
  page = 1,
  pageSize,
}) {
  const [result, setResult] = useState({ key: null, ...EMPTY, error: false });
  const { accessToken, isAuthLoading } = useAuth();

  // 지금 조건을 문자열 하나로 표시한다. 결과의 key와 다르면 아직 불러오는 중
  const queryKey = JSON.stringify([
    keyword,
    method,
    genre,
    status,
    sort,
    page,
    pageSize,
  ]);
  const loading = isAuthLoading || (accessToken && result.key !== queryKey);

  useEffect(() => {
    if (isAuthLoading || !accessToken) return;
    let ignore = false; // 늦게 도착한 옛 응답 무시용

    getMySales(accessToken, {
      keyword,
      method,
      genre,
      status,
      sort,
      page,
      pageSize,
    })
      .then((data) => {
        if (ignore) return;
        setResult({
          key: queryKey,
          cards: data.items.map(toTileCard),
          pagination: data.pagination,
          summary: data.summary,
          error: false,
        });
      })
      .catch(() => {
        if (ignore) return;
        setResult({ key: queryKey, ...EMPTY, error: true });
      });

    return () => {
      ignore = true;
    };
  }, [
    keyword,
    method,
    genre,
    status,
    sort,
    page,
    pageSize,
    queryKey,
    accessToken,
    isAuthLoading,
  ]);

  if (!isAuthLoading && !accessToken) {
    return { ...EMPTY, loading: false, error: false };
  }

  return {
    cards: result.cards,
    pagination: result.pagination,
    summary: result.summary,
    loading,
    error: result.error,
  };
}
