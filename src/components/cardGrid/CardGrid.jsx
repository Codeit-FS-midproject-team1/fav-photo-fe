import * as styles from "./CardGrid.css.js";

export default function CardGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
