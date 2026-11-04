import * as styles from "./StatusChip.css.js";

const STATUS_CONFIG = {
  ON_SALE: {
    label: "판매 중",
    color: "onSale",
  },
  OFFERED: {
    label: "교환 제시 대기 중",
    color: "offered",
  },
};

export default function StatusChip({ status }) {
  const current = STATUS_CONFIG[status];
  return <div className={styles[current.color]}>{current.label}</div>;
}
