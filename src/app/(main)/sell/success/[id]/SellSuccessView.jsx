"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ResultScreen from "@/components/resultScreen/ResultScreen.jsx";
import Button from "@/components/button/Button.jsx";
import { getSaleListing } from "@/lib/api/saleListings.js";

import * as styles from "./SellSuccessView.css.js";

export default function SellSuccessView() {
  const { id } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState({ id: null, listing: null, error: "" });

  useEffect(() => {
    if (typeof id !== "string" || !id) return;
    let isActive = true;

    getSaleListing(id)
      .then((listing) => {
        if (!isActive) return;
        if (!listing || typeof listing !== "object" || listing.id == null) {
          throw new Error("판매글 조회 응답 형식이 올바르지 않습니다.");
        }
        setResult({ id, listing, error: "" });
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
  }, [id, retryCount]);

  const handleRetry = () => {
    setResult({ id: null, listing: null, error: "" });
    setRetryCount((count) => count + 1);
  };

  if (typeof id !== "string" || !id) {
    return (
      <main className={styles.state} role="alert">
        잘못된 판매글 주소입니다.
      </main>
    );
  }

  if (result.id !== id) {
    return (
      <main className={styles.state} role="status">
        등록된 판매글을 확인 중입니다...
      </main>
    );
  }

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
      message={`${cardName}${quantityText ? ` · ${quantityText}` : ""} 판매 등록이 완료되었습니다.`}
      actions={[
        {
          text: "판매글 상세 보기",
          href: `/marketplace/${encodeURIComponent(id)}`,
        },
        { text: "마이갤러리로 이동", href: "/my-gallery" },
      ]}
    />
  );
}
