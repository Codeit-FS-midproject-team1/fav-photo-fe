"use client";

import { useState } from "react";
import Container from "@/components/container/Container.jsx";
import PageTitle from "@/components/pageTitle/PageTitle.jsx";
import Filters from "@/components/filters/Filters.jsx";
import CardTile from "@/components/cardTile/CardTile.jsx";
import StatusChip from "@/components/statusChip/StatusChip.jsx";
import CardImageModal from "@/components/cardImageModal/CardImageModal.jsx";
import * as styles from "../MySales.css.js";

// 화면 확인용 가짜 데이터 (useMySales 의 toTileCard 결과 모양)
// 상태 4가지와 비율이 다른 이미지를 섞어 둔다
const SAMPLE_CARDS = [
  {
    status: "ON_SALE",
    quantity: 3,
    imageUrl: "/landing/images/landing_desktop_1.svg",
    description: "가로로 긴 이미지 예시입니다.",
  },
  {
    status: "SOLD_OUT",
    quantity: 0,
    imageUrl: "/landing/images/landing_mobile_1.svg",
    description:
      "세로로 긴 이미지 예시입니다.\n줄바꿈이 그대로 보이는지 확인합니다.",
  },
  {
    status: "OFFER_PENDING",
    quantity: 1,
    imageUrl: "/landing/images/landing_tablet_2.svg",
    description: "교환 제시 후 대기 중 칩이 보여야 합니다.",
  },
  {
    status: "EXCHANGED",
    quantity: 1,
    imageUrl: "/landing/images/landing_desktop_3.svg",
    description: "교환 완료 카드는 눌러도 크게 보기가 열리지 않아야 합니다.",
  },
].map((card, index) => ({
  ...card,
  key: `SAMPLE-${index + 1}`,
  id: index + 1,
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
// 아직 내 소유인 상태 (판매·제안에 걸려 있을 뿐). 품절·교환 완료는 이미 남의 카드라
// 우클릭 저장을 막고 크게 보기도 열지 않는다
const OWNED_STATUSES = ["ON_SALE", "OFFER_PENDING"];

/** 가짜 데이터로 나의 거래 포토카드의 카드 목록, 상태 칩, 크게 보기 모달을 확인한다 */
export default function MySalesSample() {
  const [filter, setFilter] = useState({});
  const [viewingCard, setViewingCard] = useState(null);

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
          {cards.map((card) => {
            const isOwned = OWNED_STATUSES.includes(card.status);
            return (
              <CardTile
                key={card.key}
                card={card}
                owned={isOwned}
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
                onClick={isOwned ? () => setViewingCard(card) : undefined}
              />
            );
          })}
        </div>
      </Container>

      {viewingCard && (
        <CardImageModal
          card={viewingCard}
          onClose={() => setViewingCard(null)}
        />
      )}
    </main>
  );
}
