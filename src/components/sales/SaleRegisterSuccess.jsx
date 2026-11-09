import Link from 'next/link';
import styles from './SaleRegisterSuccess.module.css';

/** 실제 팀 라우트 경로를 Props로 받으므로 임의의 페이지 주소에 고정되지 않습니다. */
export default function SaleRegisterSuccess({
  cardName,
  quantity,
  mySalesHref,
  marketplaceHref,
}) {
  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>판매 등록 <strong>성공</strong></h1>
      <p className={styles.description}>
        {cardName} {quantity}장 판매 등록에 성공했습니다!
      </p>
      <nav className={styles.actions} aria-label="판매 등록 완료 후 이동">
        <Link href={mySalesHref} className={styles.link}>나의 판매 포토카드에서 확인하기</Link>
        <Link href={marketplaceHref} className={styles.link}>마켓플레이스로 돌아가기</Link>
      </nav>
    </main>
  );
}
