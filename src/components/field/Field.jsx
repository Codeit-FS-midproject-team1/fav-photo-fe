import * as styles from "./Field.css.js";
import clsx from "clsx";

export default function Field({ label, error, htmlFor, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>

      {children}

      <p
        className={clsx(styles.error, {
          [styles.errorHidden]: !error,
        })}
      >
        {error}
      </p>
    </div>
  );
}
