"use client";

import { useEffect, useState } from "react";
import { getMyCards } from "@/lib/api/users.js";
import { useAuth } from "@/contexts/AuthContext.jsx";

// 서버 응답 items[] 한 줄 → CardTile이 쓰는 card 모양으로 바꾼다
const toTileCard = (item) => ({
  id: item.photoCard.id,
  imageUrl: item.photoCard.imageUrl,
  name: item.photoCard.name,
  method: item.photoCard.method,
  genre: item.photoCard.genre,
  nickname: item.photoCard.creator.nickname,
  price: item.photoCard.price,
  quantity: item.quantity, // 지금 보유(HELD) 중인 장수
});

const EMPTY = { cards: [], pagination: null, summary: null };

export default function useMyCards({
  keyword = "",
  method = null,
  genre = null,
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
    sort,
    page,
    pageSize,
  ]);
  const loading = isAuthLoading || (accessToken && result.key !== queryKey);

  useEffect(() => {
    if (isAuthLoading || !accessToken) return;
    let ignore = false; // 늦게 도착한 옛 응답 무시용

    getMyCards(accessToken, { keyword, method, genre, sort, page, pageSize })
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
