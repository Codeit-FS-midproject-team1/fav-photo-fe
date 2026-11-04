import CardTile from "@/components/cardTile/CardTile.jsx";
import * as styles from "./sample.css.js";
import StatusChip from "@/components/statusChip/StatusChip.jsx";

export default function PhotocardsPage() {
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
          <CardTile card={sampleCard} badge={<StatusChip status="ON_SALE" />} />
          <CardTile
            card={sampleCard2}
            badge={<StatusChip status="OFFERED" />}
          />
          <CardTile
            card={sampleCard2}
            badge={<StatusChip status="SOLD_OUT" />}
          />
        </div>
      </section>
    </main>
  );
}
