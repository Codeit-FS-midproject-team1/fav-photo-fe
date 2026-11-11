"use client";

import { useState } from "react";
import Container from "@/components/container/Container.jsx";
import PageTitle from "@/components/pageTitle/PageTitle.jsx";
import Filters from "@/components/filters/Filters.jsx";
import CardTile from "@/components/cardTile/CardTile.jsx";
import StatusChip from "@/components/statusChip/StatusChip.jsx";
import * as styles from "@/app/(main)/my-sales/MySales.css.js";

// 화면 확인용 가짜 데이터 (useMySales의 toTileCard 결과 모양)
const IMAGE = "/landing/images/landing_desktop_1.svg";

const SAMPLE_CARDS = [
  { key: "SALE-1", status: "ON_SALE", quantity: 3 },
  { key: "SALE-2", status: "SOLD_OUT", quantity: 0 },
  { key: "OFFER-1", status: "OFFER_PENDING", quantity: 1 },
  { key: "OFFER-2", status: "EXCHANGED", quantity: 1 },
].map((card, index) => ({
  ...card,
  id: index + 1,
  imageUrl: IMAGE,
  name: `샘플 카드 ${index + 1}`,
  method: ["PHOTO", "CRAFT", "AI", "ETC"][index],
  genre: "LANDSCAPE",
  nickname: "샘플유저",
  price: 4,
}));

const STATUS_OPTIONS = [
  { value: "ON_SALE", label: "판매 중" },
  { value: "SOLD_OUT", label: "품절" },
  { value: "OFFER_PENDING", label: "교환 제시 후 대기 중" },
  { value: "EXCHANGED", label: "교환 완료" },
];

const FILTER_GROUPS = [
  { key: "status", label: "거래 상태", options: STATUS_OPTIONS },
];

const CHIP_STATUSES = ["ON_SALE", "OFFER_PENDING"];

export default function MySalesSamplePage() {
  const [filter, setFilter] = useState({});

  // 서버 대신 화면에서 거른다
  const cards = filter.status
    ? SAMPLE_CARDS.filter((card) => card.status === filter.status)
    : SAMPLE_CARDS;

  return (
    <main className={styles.page}>
      <Container>
        <PageTitle title="나의 거래 포토카드 (샘플)" />
        <div className={styles.toolbar}>
          <Filters
            groups={FILTER_GROUPS}
            values={filter}
            onChange={setFilter}
          />
        </div>
        <div className={styles.grid}>
          {cards.map((card) => (
            <CardTile
              key={card.key}
              card={card}
              owned={card.status !== "EXCHANGED"}
              soldOut={card.status === "SOLD_OUT"}
              accepted={card.status === "EXCHANGED"}
              badge={
                CHIP_STATUSES.includes(card.status) ? (
                  <StatusChip status={card.status} />
                ) : undefined
              }
              rows={[
                { label: "가격", value: `${card.price} P` },
                { label: "잔여", value: card.quantity },
              ]}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
