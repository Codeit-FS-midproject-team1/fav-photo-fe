import * as styles from "./StatusChip.css.js";

const STATUS_CONFIG = {
  ON_SALE: {
    label: "판매 중",
    color: "onSale",
  },
  OFFER_PENDING: {
    label: "교환 제시 후 대기 중",
    color: "offered",
  },
};

export default function StatusChip({ status }) {
  const current = Object.hasOwn(STATUS_CONFIG, status)
    ? STATUS_CONFIG[status]
    : undefined;

  if (!current) {
    return null;
  }

  return <div className={styles[current.color]}>{current.label}</div>;
}
