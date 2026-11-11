"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import useExchangeOffers from "@/hooks/useExchangeOffers.js";
import ExchangeOfferList from "./ExchangeOfferList.jsx";
import ExchangeOfferActionModal from "./ExchangeOfferActionModal.jsx";

import {
  cancelExchangeOffer,
  rejectExchangeOffer,
  acceptExchangeOffer,
} from "@/lib/api/exchangeOffers.js";

const ACTION_REQUESTS = {
  cancel: cancelExchangeOffer,
  reject: rejectExchangeOffer,
  accept: acceptExchangeOffer,
};

const SUCCESS_MESSAGES = {
  cancel: "교환 제안이 취소되었습니다.",
  reject: "교환 제안을 거절했습니다.",
  accept: "교환 제안을 승인했습니다.",
};

export default function ExchangeOfferListSection({
  listingId,
  sellerId,
  onAccepted,
}) {
  const { user, accessToken, isAuthLoading } = useAuth();

  const { items, loading, error, refresh } = useExchangeOffers(listingId);

  const [actionTarget, setActionTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const submittingRef = useRef(false);

  const handleOpenAction = (action, offer) => {
    if (submittingRef.current) return;

    setActionError("");
    setActionMessage("");
    setActionTarget({ action, offer });
  };

  const handleCloseAction = () => {
    if (submittingRef.current) return;

    setActionTarget(null);
    setActionError("");
  };

  const handleConfirmAction = async () => {
    if (!actionTarget || submittingRef.current) return;

    if (!accessToken) {
      setActionError("로그인이 필요합니다.");
      return;
    }

    const { action, offer } = actionTarget;
    const requestAction = ACTION_REQUESTS[action];

    if (!requestAction) {
      setActionError("지원하지 않는 교환 제안 작업입니다.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setActionError("");

    let actionSucceeded = false;

    try {
      await requestAction(accessToken, offer.id);

      setActionMessage(
        SUCCESS_MESSAGES[action] ?? "교환 제안 처리가 완료되었습니다.",
      );

      setActionTarget(null);
      refresh();
      actionSucceeded = true;
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "교환 제안을 처리하는 중 오류가 발생했습니다.",
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }

    if (actionSucceeded && action === "accept") {
      onAccepted?.();
    }
  };

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
    <>
      <ExchangeOfferList
        items={items}
        viewerRole={isSeller ? "seller" : "offerer"}
        loading={loading || isAuthLoading}
        error={displayError}
        onCancel={(offer) => handleOpenAction("cancel", offer)}
        onReject={(offer) => handleOpenAction("reject", offer)}
        onAccept={(offer) => handleOpenAction("accept", offer)}
      />

      {actionMessage && <p role="status">{actionMessage}</p>}

      <ExchangeOfferActionModal
        open={Boolean(actionTarget)}
        action={actionTarget?.action ?? "cancel"}
        onClose={handleCloseAction}
        onConfirm={handleConfirmAction}
        submitting={submitting}
        error={actionError}
      />
    </>
  );
}
