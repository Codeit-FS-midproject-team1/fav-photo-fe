"use client";

import { useRef, useState } from "react";
import CardGrid from "@/components/cardGrid/CardGrid";
import CardTile from "@/components/cardTile/CardTile";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSaleListings } from "@/lib/api/saleListings.js";
import { MARKET_PAGE_SIZE } from "@/lib/constants.js";
import * as styles from "./Marketplace.css.js";

export default function MarketList({ accessToken, query }) {
  const [items, setItems] = useState([]);
  const [loadedPages, setLoadedPages] = useState(0);
  const [totalCount, setTotalCount] = useState(null);
  const [error, setError] = useState("");
  const nextPage = useRef(1);

  // 실패하면 hasMore 를 false 로 넘겨 재요청 반복을 막는다
  const hasMore =
    !error &&
    (totalCount === null || loadedPages * MARKET_PAGE_SIZE < totalCount);

  const ref = useInfiniteScroll(async () => {
    const page = nextPage.current;
    try {
      const data = await getSaleListings(
        { ...query, page, pageSize: MARKET_PAGE_SIZE },
        accessToken,
      );
      nextPage.current = page + 1;
      setLoadedPages(page);
      setTotalCount(data.totalCount);
      // 스크롤 중 새 판매글이 올라오면 같은 판매글이 다시 올 수 있어 id 로 거른다
      setItems((prev) => [
        ...prev,
        ...data.items.filter((item) => !prev.some((p) => p.id === item.id)),
      ]);
    } catch (e) {
      setError(e.message);
    }
  }, hasMore);

  return (
    <div className={styles.list}>
      {totalCount === 0 ? (
        <p className={styles.message}>조건에 맞는 포토카드가 없어요.</p>
      ) : (
        <CardGrid>
          {items.map((listing) => (
            <CardTile
              key={listing.id}
              href={`/marketplace/${listing.id}`}
              soldOut={listing.status === "SOLD_OUT"}
              card={{ ...listing.photoCard, nickname: listing.seller.nickname }}
              rows={[
                { label: "가격", value: `${listing.price} P` },
                {
                  label: "잔여",
                  value: listing.remainingQuantity,
                  total: listing.saleQuantity,
                },
              ]}
            />
          ))}
        </CardGrid>
      )}

      {error && (
        <p role="alert" className={styles.message}>
          {error}{" "}
          <button type="button" onClick={() => setError("")}>
            다시 시도
          </button>
        </p>
      )}

      {/* 끝 요소는 로딩 중에도 그대로 둔다 (useInfiniteScroll 규칙) */}
      <div ref={ref} />
    </div>
  );
}
