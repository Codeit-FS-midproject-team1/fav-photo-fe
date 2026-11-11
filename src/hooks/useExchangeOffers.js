"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { getExchangeOffers } from "@/lib/api/exchangeOffers.js";

// BE 응답을 ExchangeOfferList의 데이터 구조로 변환
const toListItem = (offer) => ({
  id: offer.id,
  status: offer.status,
  description: offer.description,
  offererNickname: offer.offerer.nickname,
  createdAt: offer.createdAt,
  card: {
    id: offer.photoCard.id,
    name: offer.photoCard.name,
    imageUrl: offer.photoCard.imageUrl,
    method: offer.photoCard.method,
    genre: offer.photoCard.genre,
    nickname: offer.photoCard.creator.nickname,
    price: offer.photoCard.price,
  },
});

export default function useExchangeOffers(listingId) {
  const { accessToken, isAuthLoading } = useAuth();

  const [reloadCount, setReloadCount] = useState(0);

  const [result, setResult] = useState({
    key: null,
    items: [],
    error: "",
  });

  const id = Number(listingId);
  const validListingId = Number.isSafeInteger(id) && id > 0;

  const queryKey = JSON.stringify([id, accessToken, reloadCount]);

  const loading =
    isAuthLoading ||
    (validListingId && Boolean(accessToken) && result.key !== queryKey);

  useEffect(() => {
    if (isAuthLoading || !accessToken || !validListingId) {
      return;
    }

    let cancelled = false;

    getExchangeOffers(accessToken, id)
      .then((data) => {
        if (!Array.isArray(data?.items)) {
          throw new Error("교환 제안 목록 응답 형식이 올바르지 않습니다.");
        }

        if (cancelled) return;

        setResult({
          key: queryKey,
          items: data.items.map(toListItem),
          error: "",
        });
      })
      .catch((error) => {
        if (cancelled) return;

        setResult({
          key: queryKey,
          items: [],
          error:
            error instanceof Error
              ? error.message
              : "교환 제안 목록을 불러오지 못했습니다.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, isAuthLoading, validListingId, id, queryKey]);

  const error = !validListingId
    ? "판매글 ID가 올바르지 않습니다."
    : !isAuthLoading && !accessToken
      ? "로그인이 필요합니다."
      : loading
        ? ""
        : result.error;

  return {
    items: loading || error ? [] : result.items,
    loading,
    error,
    refresh: () => setReloadCount((count) => count + 1),
  };
}
