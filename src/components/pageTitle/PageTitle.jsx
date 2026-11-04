import * as styles from './PageTitle.css';

/**
 * @param {string} title - 페이지 제목 (예: "마켓플레이스")
 * @param {React.ReactNode} children - 오른쪽 영역 (예: 판매하기 버튼, 선택)
 */

export default function PageTitle({ title, children }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
}