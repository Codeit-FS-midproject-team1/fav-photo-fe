"use client";

import CardTile from "@/components/cardTile/CardTile.jsx";
import * as styles from "./sample.css.js";
import StatusChip from "@/components/statusChip/StatusChip.jsx";
import Pagination from "@/components/pagination/Pagination.jsx";
import { useState } from "react";

export default function MyGalleryPage() {
  const [page, setPage] = useState(1);

  const sampleCard = {
    imageUrl: "/globe.svg",
    name: "테스트 포토카드",
    method: "PHOTO",
    genre: "LANDSCAPE",
    nickname: "테스트 유저",
  };

  const sampleCard2 = {
    imageUrl: "/file.svg",
    name: "테스트 포토카드",
    method: "PHOTO",
    genre: "LANDSCAPE",
    nickname: "테스트 유저",
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.title}>마이갤러리</h1>
        <div className={styles.cardWrapper}>
          <CardTile
            card={sampleCard}
            rows={[
              { label: "가격", value: "4 P" },
              { label: "잔여", value: 5 },
            ]}
            badge={<StatusChip status="ON_SALE" />}
          />
          <CardTile
            card={sampleCard2}
            rows={[
              { label: "가격", value: "100 P" },
              { label: "잔여", value: 1 },
            ]}
            badge={<StatusChip status="OFFERED" />}
          />
          <CardTile
            card={sampleCard2}
            rows={[
              { label: "가격", value: "120 P" },
              { label: "잔여", value: 1 },
            ]}
            badge={<StatusChip status="toString" />}
          />
        </div>
        <p className={styles.currentPageSample}>현재 페이지: {page}</p>
        <Pagination page={page} totalPages={40} onChange={setPage} />
      </section>
    </main>
  );
}
