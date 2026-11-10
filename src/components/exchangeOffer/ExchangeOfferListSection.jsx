"use client";

import { useAuth } from "@/contexts/AuthContext.jsx";
import useExchangeOffers from "@/hooks/useExchangeOffers.js";
import ExchangeOfferList from "./ExchangeOfferList.jsx";

export default function ExchangeOfferListSection({
  listingId,
  sellerId,
  onCancel,
  onReject,
  onAccept,
}) {
  const { user, accessToken, isAuthLoading } = useAuth();

  const { items, loading, error } = useExchangeOffers(listingId);

  // 판매글의 판매자와 현재 로그인한 사용자 비교
  const currentUserId = Number(user?.id);
  const listingSellerId = Number(sellerId);

  const validUserId = Number.isSafeInteger(currentUserId) && currentUserId > 0;

  const validSellerId =
    Number.isSafeInteger(listingSellerId) && listingSellerId > 0;

  const isSeller =
    validUserId && validSellerId && currentUserId === listingSellerId;

  // 로그인 사용자 또는 판매자 정보가 불완전한 경우
  let displayError = error;

  if (!isAuthLoading && accessToken && !validUserId) {
    displayError ||= "로그인 사용자 정보를 확인할 수 없습니다.";
  }

  if (!validSellerId) {
    displayError ||= "판매자 정보를 확인할 수 없습니다.";
  }

  return (
    <ExchangeOfferList
      items={items}
      viewerRole={isSeller ? "seller" : "offerer"}
      loading={loading || isAuthLoading}
      error={displayError}
      onCancel={onCancel}
      onReject={onReject}
      onAccept={onAccept}
    />
  );
}
