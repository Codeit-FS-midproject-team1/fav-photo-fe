import Link from "next/link";
import * as styles from "./PhotoCardCreateSuccess.css.js";

const methodLabels = {
  PHOTO: "촬영",
  CRAFT: "제작",
  AI: "AI생성",
  ETC: "기타",
};

export default async function PhotoCardCreateSuccess({ searchParams }) {
  const params = await searchParams;

  const cardName = params?.name || "포토카드";
  const method = params?.method || "PHOTO";
  const methodLabel = methodLabels[method] || method;

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <h1 className={styles.title}>
          <span>포토카드 생성 </span>
          <span className={styles.accent}>성공</span>
        </h1>

        <p className={styles.message}>
          [{methodLabel} | {cardName}] 포토카드 생성에 성공했습니다!
        </p>

        <Link href="/my-gallery" className={styles.galleryButton}>
          마이갤러리에서 확인하기
        </Link>
      </section>
    </main>
  );
}
