"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/button/Button.jsx";
import CardTile from "@/components/cardTile/CardTile.jsx";
import ListingFormModal from "@/components/common/ListingFormModal/ListingFormModal.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { createSaleListing, getSaleableCards } from "@/lib/api/saleListings.js";
import { SALE_CARD_PAGE_SIZE } from "@/lib/constants.js";
import { isRequestResultUncertain } from "@/lib/isRequestResultUncertain.js";

import * as styles from "./SellRegisterView.css.js";

function normalizeHeldCard(item) {
  const photoCard = item?.photoCard;
  const quantity = Number(item?.quantity);

  if (
    photoCard?.id == null ||
    !Number.isSafeInteger(quantity) ||
    quantity < 1
  ) {
    return null;
  }

  return {
    id: photoCard.id,
    name: photoCard.name ?? "포토카드",
    imageUrl: photoCard.imageUrl ?? "",
    method: photoCard.method,
    genre: photoCard.genre,
    price: photoCard.price,
    nickname: photoCard.creator?.nickname ?? "제작자 정보 없음",
    quantity,
  };
}

export default function SellRegisterView() {
  const router = useRouter();
  const { accessToken, isAuthLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const [response, setResponse] = useState({
    page: null,
    retryCount: null,
    token: null,
    items: [],
    totalCount: null,
    error: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  // state 갱신 전 연속 제출을 차단합니다. 등록 API에는 중복 방지 키가 없습니다.
  const submitLockRef = useRef(false);

  const isAuthenticated = !isAuthLoading && Boolean(accessToken);

  useEffect(() => {
    if (!isAuthenticated) return;

    let isActive = true;
    const controller = new AbortController();

    getSaleableCards({ page, pageSize: SALE_CARD_PAGE_SIZE }, accessToken, {
      signal: controller.signal,
    })
      .then((data) => {
        if (!isActive) return;

        if (!data || !Array.isArray(data.items)) {
          throw new Error("보유 카드 목록 응답 형식이 올바르지 않습니다.");
        }

        setResponse({
          page,
          retryCount,
          token: accessToken,
          items: data.items,
          totalCount: Number.isSafeInteger(data.totalCount)
            ? data.totalCount
            : null,
          error: "",
        });
      })
      .catch((error) => {
        if (!isActive) return;

        setResponse({
          page,
          retryCount,
          token: accessToken,
          items: [],
          totalCount: null,
          error: error?.message || "보유 카드 목록을 불러오지 못했습니다.",
        });
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [accessToken, isAuthenticated, page, retryCount]);

  const isLoading =
    isAuthenticated &&
    (response.page !== page ||
      response.retryCount !== retryCount ||
      response.token !== accessToken);
  const cards = response.items.map(normalizeHeldCard).filter(Boolean);
  const canGoNext =
    response.totalCount === null
      ? response.items.length === SALE_CARD_PAGE_SIZE
      : page * SALE_CARD_PAGE_SIZE < response.totalCount;

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  const handleSelectCard = (card) => {
    if (hasSubmitted) return;
    setSubmissionError("");
    setNotice("");
    setSelectedCard(card);
  };

  const handleSubmit = async (formValues) => {
    if (submitLockRef.current || hasSubmitted || isSubmitting) return;
    if (!selectedCard) {
      throw new Error("판매 등록을 진행할 수 없습니다.");
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    let createdListing;
    try {
      createdListing = await createSaleListing(
        selectedCard.id,
        formValues,
        accessToken,
      );
    } catch (error) {
      setIsSubmitting(false);
      const isUncertain = isRequestResultUncertain(error);

      if (isUncertain) {
        // 등록 API에는 구매와 달리 중복 요청 방지 키가 없으므로 자동 재시도하지 않습니다.
        setHasSubmitted(true);
        setSelectedCard(null);
        setSubmissionError(
          error?.message || "판매 등록 응답을 확인하지 못했습니다.",
        );
        setNotice(
          "판매 등록 결과를 확인하지 못했습니다. 중복 등록을 피하기 위해 다시 등록하기 전에 판매 내역을 확인해 주세요.",
        );
        return;
      }

      // 결과가 불확실하지 않은 오류에서만 제출 잠금을 해제합니다.
      submitLockRef.current = false;
      throw error;
    }

    // 등록 요청 자체가 성공했다면, ID가 누락되어도 중복 제출하지 않습니다.
    setHasSubmitted(true);
    const createdId = createdListing?.id;

    if (
      createdId === null ||
      createdId === undefined ||
      String(createdId) === ""
    ) {
      setSelectedCard(null);
      setNotice(
        "판매 등록 요청은 성공했지만 응답에서 판매글 ID를 확인하지 못했습니다. 중복 등록하지 말고 내 판매 내역을 확인해 주세요.",
      );
      return;
    }

    router.push(`/sell/success/${encodeURIComponent(String(createdId))}`);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>포토카드 판매 등록</h1>
        <p className={styles.description}>
          보유 중인 포토카드를 선택해 수량, 가격, 교환 희망 조건을 등록하세요.
        </p>
      </header>

      {submissionError && (
        <p className={styles.error} role="alert">
          {submissionError}
        </p>
      )}
      {notice && (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      )}

      {isAuthLoading ? (
        <p className={styles.message} role="status">
          로그인 정보를 확인하고 있습니다.
        </p>
      ) : !isAuthenticated ? (
        <div className={styles.emptyState}>
          <p className={styles.message}>
            판매 등록을 위해 로그인이 필요합니다.
          </p>
          <Button href="/login" variant="primary">
            로그인하기
          </Button>
        </div>
      ) : isLoading ? (
        <p className={styles.message} role="status">
          판매 가능한 카드를 불러오는 중입니다.
        </p>
      ) : response.error ? (
        <div className={styles.emptyState}>
          <p className={styles.error} role="alert">
            {response.error}
          </p>
          <Button type="button" variant="secondary" onClick={handleRetry}>
            다시 시도하기
          </Button>
        </div>
      ) : hasSubmitted ? (
        <div className={styles.emptyState}>
          <p className={styles.message}>판매 등록 결과를 확인해 주세요.</p>
          <Link href="/my-gallery" className={styles.link}>
            마이갤러리로 이동
          </Link>
        </div>
      ) : cards.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.message}>
            이 페이지에 판매 가능한 보유 카드가 없습니다.
          </p>
          <Link href="/my-gallery" className={styles.link}>
            마이갤러리로 이동
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {cards.map((card) => (
              <CardTile
                key={card.id}
                card={card}
                owned
                rows={[{ label: "보유 수량", value: `${card.quantity}장` }]}
                onClick={() => handleSelectCard(card)}
              />
            ))}
          </div>
          <nav className={styles.pagination} aria-label="보유 카드 페이지 이동">
            <button
              type="button"
              className={styles.pageButton}
              disabled={page === 1 || hasSubmitted}
              onClick={() => setPage((current) => current - 1)}
            >
              이전
            </button>
            <span>{page}페이지</span>
            <button
              type="button"
              className={styles.pageButton}
              disabled={!canGoNext || hasSubmitted}
              onClick={() => setPage((current) => current + 1)}
            >
              다음
            </button>
          </nav>
        </>
      )}

      {selectedCard && (
        <ListingFormModal
          key={selectedCard.id}
          card={selectedCard}
          maxQuantity={selectedCard.quantity}
          onSubmit={handleSubmit}
          onClose={() => {
            if (!isSubmitting && !hasSubmitted) setSelectedCard(null);
          }}
          isSubmitting={isSubmitting || hasSubmitted}
        />
      )}
    </main>
  );
}
