"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext.jsx";
import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import ListingDetailLayout from "@/components/common/ListingDetailLayout/ListingDetailLayout.jsx";
import ListingFormModal from "@/components/common/ListingFormModal/ListingFormModal.jsx";
import PurchasePanel from "@/components/sales/PurchasePanel.jsx";
import ExchangeOfferFlow from "@/components/exchangeOffer/ExchangeOfferFlow.jsx";
import ExchangeOfferListSection from "@/components/exchangeOffer/ExchangeOfferListSection.jsx";
import {
  getSaleListing,
  updateSaleListing,
  cancelSaleListing,
  getHeldPhotoCardQuantity,
} from "@/lib/api/saleListings.js";

import * as styles from "./SaleDetailView.css.js";

export default function SaleDetailView() {
  const { id } = useParams();
  const { user, accessToken, isAuthLoading, refreshUser } = useAuth();
  const cancelTitleId = useId();

  const [retryCount, setRetryCount] = useState(0);

  const [result, setResult] = useState({
    requestedId: null,
    status: "loading",
    listing: null,
    message: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [exchangeListVersion, setExchangeListVersion] = useState(0);
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelLockRef = useRef(false);

  const [cancelError, setCancelError] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState(null);

  const [heldResult, setHeldResult] = useState({
    key: null,
    quantity: 0,
    error: "",
  });

  // 판매글 상세 조회
  useEffect(() => {
    if (typeof id !== "string" || !id || isAuthLoading) return;

    let isActive = true;

    async function loadSaleListing() {
      try {
        const listing = await getSaleListing(id, accessToken);

        if (!isActive) return;

        if (!listing || typeof listing !== "object" || Array.isArray(listing)) {
          throw new Error("판매글 응답 형식이 올바르지 않습니다.");
        }

        setResult({
          requestedId: id,
          status: "success",
          listing,
          message: "",
        });
      } catch (error) {
        if (!isActive) return;

        setResult({
          requestedId: id,
          status: "error",
          listing: null,
          message: error?.message || "판매글 조회에 실패했습니다.",
        });
      }
    }

    loadSaleListing();

    return () => {
      isActive = false;
    };
  }, [id, retryCount, isAuthLoading, accessToken]);

  // 판매글이 현재 화면의 조회 결과일 때만
  // 보유 카드 조회를 허용합니다.
  const activeListing =
    result.requestedId === id && result.status === "success"
      ? result.listing
      : null;

  const activeSellerId =
    activeListing?.sellerId ??
    activeListing?.seller?.id ??
    activeListing?.seller_id;

  const activePhotoCardId =
    activeListing?.photoCardId ??
    activeListing?.photoCard?.id ??
    activeListing?.photo_card_id;

  const isOwnerOfActiveListing =
    !isAuthLoading &&
    Boolean(accessToken) &&
    user?.id != null &&
    activeSellerId != null &&
    String(user.id) === String(activeSellerId);

  const heldLookupKey =
    isOwnerOfActiveListing &&
    activeListing?.status === "ON_SALE" &&
    activePhotoCardId != null
      ? `${id}:${activePhotoCardId}:${user.id}:${retryCount}`
      : null;

  // 추가 보유 카드 수량 조회
  useEffect(() => {
    if (!heldLookupKey) return;

    const controller = new AbortController();
    let isActive = true;

    getHeldPhotoCardQuantity(activePhotoCardId, accessToken, {
      signal: controller.signal,
    })
      .then((quantity) => {
        if (!isActive) return;

        setHeldResult({
          key: heldLookupKey,
          quantity,
          error: "",
        });
      })
      .catch((error) => {
        if (!isActive) return;

        setHeldResult({
          key: heldLookupKey,
          quantity: 0,
          error: error?.message || "추가 보유 수량을 확인하지 못했습니다.",
        });
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [heldLookupKey, activePhotoCardId, accessToken]);

  // 판매글 다시 조회
  const handleRetry = () => {
    setResult({
      requestedId: id,
      status: "loading",
      listing: null,
      message: "",
    });

    setRetryCount((count) => count + 1);
  };

  // 판매글 수정
  const handleUpdate = async (formValues) => {
    await updateSaleListing(id, formValues, accessToken);

    setIsEditOpen(false);
    handleRetry();
  };

  // 판매 취소 모달 열기
  const handleOpenCancel = () => {
    setCancelError("");
    setIsCancelOpen(true);
  };

  // 판매 취소 모달 닫기
  const handleCloseCancel = () => {
    if (!isCancelling) {
      setIsCancelOpen(false);
    }
  };

  // 판매 취소
  const handleCancel = async () => {
    if (isCancelling || cancelLockRef.current) return;

    cancelLockRef.current = true;
    setIsCancelling(true);
    setCancelError("");

    try {
      await cancelSaleListing(id, accessToken);

      setIsCancelOpen(false);

      setResult((previous) => {
        if (previous.requestedId !== id || !previous.listing) {
          return previous;
        }

        return {
          ...previous,
          listing: {
            ...previous.listing,
            status: "CANCELED",
          },
        };
      });
    } catch (error) {
      setCancelError(error?.message || "판매 취소에 실패했습니다.");
    } finally {
      cancelLockRef.current = false;
      setIsCancelling(false);
    }
  };

  // 구매 완료
  const handlePurchased = ({ quantity } = {}) => {
    const hasQuantity = Number.isSafeInteger(quantity) && quantity > 0;

    setPurchaseMessage({
      listingId: id,
      text: hasQuantity
        ? `${quantity}장 구매가 완료되었습니다.`
        : "구매가 완료되었습니다.",
    });

    // 1. 구매 완료 후 판매글 정보 갱신
    handleRetry();

    // 2. 구매 완료 후 사용자 포인트 갱신
    // 사용자 정보 갱신 실패가 이미 완료된 구매를
    // 실패로 처리하지 않도록 별도로 처리합니다.
    refreshUser().catch((error) => {
      console.error("구매 후 사용자 정보 갱신 실패:", error);
    });
  };

  // 잘못된 판매글 ID
  if (typeof id !== "string" || !id) {
    return (
      <main className={styles.page}>
        <div className={styles.stateBox} role="alert">
          <h1 className={styles.stateTitle}>잘못된 판매글 주소입니다.</h1>
        </div>
      </main>
    );
  }

  const isLoading = result.requestedId !== id || result.status === "loading";

  // 로딩 화면
  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.stateBox} role="status">
          <p className={styles.stateText}>판매글을 불러오는 중입니다...</p>
        </div>
      </main>
    );
  }

  // 오류 화면
  if (result.status === "error") {
    return (
      <main className={styles.page}>
        <div className={styles.stateBox} role="alert">
          <h1 className={styles.stateTitle}>판매글을 불러올 수 없습니다.</h1>

          <p className={styles.stateText}>{result.message}</p>

          <button
            type="button"
            className={styles.retryButton}
            onClick={handleRetry}
          >
            다시 시도하기
          </button>
        </div>
      </main>
    );
  }

  const listing = result.listing;

  const sellerId = listing.sellerId ?? listing.seller?.id ?? listing.seller_id;

  const isSeller =
    !isAuthLoading &&
    user?.id != null &&
    sellerId != null &&
    String(user.id) === String(sellerId);

  const isAuthenticated =
    !isAuthLoading && Boolean(user?.id != null && accessToken);

  const remainingQuantity = Number(
    listing.remainingQuantity ?? listing.remaining_quantity ?? 0,
  );

  const isOnSale = listing.status === "ON_SALE";

  const hasRemainingStock =
    Number.isSafeInteger(remainingQuantity) && remainingQuantity > 0;

  const canManage = isSeller && isOnSale && hasRemainingStock;

  const canPurchase =
    isAuthenticated &&
    sellerId != null &&
    !isSeller &&
    isOnSale &&
    hasRemainingStock;

  const canOfferExchange =
    isAuthenticated &&
    sellerId != null &&
    !isSeller &&
    (isOnSale || listing.status === "EXCHANGE_ONLY") &&
    hasRemainingStock;

  // 추가 보유 카드 수량
  const hasHeldQuantity =
    heldLookupKey !== null &&
    heldResult.key === heldLookupKey &&
    !heldResult.error;

  const additionalHeldQuantity = hasHeldQuantity ? heldResult.quantity : 0;

  const maxEditQuantity = canManage
    ? remainingQuantity + additionalHeldQuantity
    : 0;

  const card = listing.photoCard ??
    listing.card ?? {
      name: listing.cardName ?? "포토카드",
    };

  let actions = null;

  // 판매자: 수정 / 판매 취소
  if (canManage) {
    actions = (
      <div className={styles.actionRow}>
        <Button
          type="button"
          variant="secondary"
          size="responsive"
          thickness="thin"
          onClick={() => setIsEditOpen(true)}
        >
          수정하기
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="responsive"
          thickness="thin"
          onClick={handleOpenCancel}
        >
          판매 내리기
        </Button>
      </div>
    );
  } else if (canPurchase || canOfferExchange) {
    actions = (
      <div className={styles.actionRow}>
        {canPurchase && (
          <PurchasePanel
            key={id}
            listingId={id}
            price={listing.price}
            remainingQuantity={remainingQuantity}
            accessToken={accessToken}
            onPurchased={handlePurchased}
            onRefreshListing={handleRetry}
          />
        )}

        {canOfferExchange && (
          <Button
            type="button"
            variant="secondary"
            size="responsive"
            thickness="thin"
            onClick={() => setIsExchangeOpen(true)}
          >
            교환 제안하기
          </Button>
        )}
      </div>
    );
  } else if (
    !isAuthLoading &&
    !isAuthenticated &&
    sellerId != null &&
    isOnSale &&
    hasRemainingStock
  ) {
    // 비로그인 사용자 안내
    actions = (
      <p className={styles.stateText}>
        구매하려면{" "}
        <Link href="/login" className={styles.noticeLink}>
          로그인
        </Link>
        이 필요합니다.
      </p>
    );
  }

  return (
    <main className={styles.page}>
      {/* 구매 성공 메시지 */}
      {purchaseMessage?.listingId === id && (
        <div className={styles.notice} role="status">
          {purchaseMessage.text}
        </div>
      )}

      {/* 판매 취소 안내 */}
      {listing.status === "CANCELED" && (
        <div className={styles.notice} role="status">
          <p>판매가 취소되었습니다.</p>
          <p>남아 있던 포토카드는 보유 상태로 돌아갑니다.</p>

          <Link href="/my-gallery" className={styles.noticeLink}>
            마이갤러리로 이동
          </Link>
        </div>
      )}

      {/* 품절 안내 */}
      {listing.status === "SOLD_OUT" && (
        <div className={styles.notice} role="status">
          판매가 완료된 포토카드입니다.
        </div>
      )}

      {/* 보유 카드 수량 확인 중 */}
      {canManage && heldLookupKey && heldResult.key !== heldLookupKey && (
        <p className={styles.stateText} role="status">
          추가 보유 수량을 확인하고 있습니다. 확인 전에는 현재 남은 수량까지만
          수정할 수 있습니다.
        </p>
      )}

      {/* 보유 카드 수량 확인 실패 */}
      {canManage &&
        heldLookupKey &&
        heldResult.key === heldLookupKey &&
        heldResult.error && (
          <p className={styles.stateText} role="status">
            추가 보유 수량을 확인하지 못해 현재 남은 수량까지만 수정할 수
            있습니다.
          </p>
        )}

      {/* 판매글 상세 및 교환 제안 목록 */}
      <ListingDetailLayout listing={listing} actions={actions}>
        {isAuthenticated &&
          sellerId != null &&
          listing.status !== "CANCELED" && (
            <ExchangeOfferListSection
              key={`${id}-${exchangeListVersion}`}
              listingId={id}
              sellerId={sellerId}
              onAccepted={handleRetry}
            />
          )}
      </ListingDetailLayout>

      {/* 교환 제안 모달 */}
      {isExchangeOpen && (
        <ExchangeOfferFlow
          key={id}
          listingId={id}
          onClose={() => setIsExchangeOpen(false)}
          onSuccess={() => {
            setExchangeListVersion((version) => version + 1);
          }}
        />
      )}

      {/* 판매글 수정 모달 */}
      {isEditOpen && (
        <ListingFormModal
          key={id}
          card={card}
          listing={listing}
          maxQuantity={maxEditQuantity}
          onSubmit={handleUpdate}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {/* 판매 취소 확인 모달 */}
      <Modal
        open={isCancelOpen}
        onClose={handleCloseCancel}
        size="lg"
        labelledBy={cancelTitleId}
      >
        <div className={styles.confirmBody}>
          <h2 id={cancelTitleId} className={styles.confirmTitle}>
            판매를 내리시겠습니까?
          </h2>

          <p className={styles.confirmDescription}>
            남은 판매 카드는 보유 상태로 전환됩니다. 대기 중인 교환 제안은
            자동으로 거절됩니다.
          </p>

          {cancelError && (
            <p className={styles.error} role="alert">
              {cancelError}
            </p>
          )}

          <div className={styles.confirmActions}>
            <Button
              type="button"
              variant="secondary"
              size="responsive"
              thickness="thin"
              onClick={handleCloseCancel}
              disabled={isCancelling}
            >
              돌아가기
            </Button>

            <Button
              type="button"
              variant="primary"
              size="responsive"
              thickness="thin"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "처리 중..." : "판매 내리기"}
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
