"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ResultScreen from "@/components/resultScreen/ResultScreen.jsx";
import Button from "@/components/button/Button.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { getSaleListing } from "@/lib/api/saleListings.js";

import * as styles from "./SellSuccessView.css.js";

export default function SellSuccessView() {
  const { id } = useParams();
  const { accessToken, isAuthLoading } = useAuth();

  const [retryCount, setRetryCount] = useState(0);

  const [result, setResult] = useState({
    id: null,
    listing: null,
    error: "",
  });

  // 등록 완료된 판매글 상세 정보 조회
  useEffect(() => {
    if (typeof id !== "string" || !id || isAuthLoading || !accessToken) {
      return;
    }

    let isActive = true;

    getSaleListing(id, accessToken)
      .then((listing) => {
        if (!isActive) return;

        if (!listing || typeof listing !== "object" || listing.id == null) {
          throw new Error("판매글 조회 응답 형식이 올바르지 않습니다.");
        }

        setResult({
          id,
          listing,
          error: "",
        });
      })
      .catch((error) => {
        if (!isActive) return;

        setResult({
          id,
          listing: null,
          error: error?.message || "판매글 확인에 실패했습니다.",
        });
      });

    return () => {
      isActive = false;
    };
  }, [id, retryCount, accessToken, isAuthLoading]);

  // 판매글 다시 조회
  const handleRetry = () => {
    setResult({
      id: null,
      listing: null,
      error: "",
    });

    setRetryCount((count) => count + 1);
  };

  // 잘못된 판매글 주소
  if (typeof id !== "string" || !id) {
    return (
      <main className={styles.state} role="alert">
        잘못된 판매글 주소입니다.
      </main>
    );
  }

  // 로그인 정보 확인 중
  if (isAuthLoading) {
    return (
      <main className={styles.state} role="status">
        로그인 정보를 확인하고 있습니다...
      </main>
    );
  }

  // 비로그인 사용자
  if (!accessToken) {
    return (
      <main className={styles.state}>
        <p>판매 등록 결과를 확인하려면 로그인이 필요합니다.</p>
        <Button href="/login" variant="primary">
          로그인하기
        </Button>
      </main>
    );
  }

  // 판매글 조회 중
  if (result.id !== id) {
    return (
      <main className={styles.state} role="status">
        등록된 판매글을 확인 중입니다...
      </main>
    );
  }

  // 판매글 조회 실패
  if (result.error) {
    return (
      <main className={styles.state} role="alert">
        <p>{result.error}</p>
        <p>
          이미 등록되었을 수 있으므로 새 판매 등록을 중복으로 시도하지 마세요.
        </p>

        <Button type="button" variant="secondary" onClick={handleRetry}>
          판매글 다시 조회
        </Button>
      </main>
    );
  }

  const listing = result.listing;

  const cardName = listing.photoCard?.name ?? listing.cardName ?? "포토카드";

  const quantity = listing.saleQuantity;

  const quantityText = Number.isSafeInteger(quantity) ? `${quantity}장` : "";

  return (
    <ResultScreen
      success
      title="판매 등록"
      message={`${cardName}${
        quantityText ? ` · ${quantityText}` : ""
      } 판매 등록이 완료되었습니다.`}
      actions={[
        {
          text: "판매글 상세 보기",
          href: `/marketplace/${encodeURIComponent(id)}`,
        },
        {
          text: "마이갤러리로 이동",
          href: "/my-gallery",
        },
      ]}
    />
  );
}
