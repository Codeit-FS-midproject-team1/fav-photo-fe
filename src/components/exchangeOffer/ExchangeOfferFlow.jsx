"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import CardPickerModal from "@/components/cardPickerModal/CardPickerModal";
import ExchangeOfferFormModal from "./ExchangeOfferFormModal";
import { createExchangeOffer } from "@/lib/api/exchangeOffers";

export default function ExchangeOfferFlow({ listingId, onClose, onSuccess }) {
  const { accessToken } = useAuth();

  const [step, setStep] = useState("picker");
  const [selectedCard, setSelectedCard] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submittingRef = useRef(false);

  // 보유 카드 선택 → 교환 정보 입력
  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setError("");
    setStep("form");
  };

  // 정보 입력 → 카드 선택으로 돌아가기
  const handleBack = () => {
    if (submittingRef.current) return;

    setError("");
    setStep("picker");
  };

  // 모달 닫기
  const handleClose = () => {
    if (submittingRef.current) return;
    onClose?.();
  };

  // 교환 제안 생성 API 호출
  const handleSubmit = async (data) => {
    if (submittingRef.current) return;

    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    const id = Number(listingId);

    if (!Number.isSafeInteger(id) || id <= 0) {
      setError("판매글 정보를 확인할 수 없습니다.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    let createdOffer;

    try {
      createdOffer = await createExchangeOffer(accessToken, id, data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "교환 제안 중 오류가 발생했습니다.",
      );
      return;
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }

    // API 성공 후 UI 처리 (API 오류 처리와 분리)
    onSuccess?.(createdOffer);
    onClose?.();
  };

  return (
    <>
      {step === "picker" && (
        <CardPickerModal
          title="교환할 포토카드를 선택해 주세요"
          onSelect={handleSelectCard}
          onClose={handleClose}
        />
      )}

      <ExchangeOfferFormModal
        open={step === "form"}
        selectedCard={selectedCard}
        onBack={handleBack}
        onClose={handleClose}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
    </>
  );
}
