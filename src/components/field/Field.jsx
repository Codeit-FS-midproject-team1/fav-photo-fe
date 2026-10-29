import * as styles from "./Field.css.js";

export default function Field({ label, error, htmlFor, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>

      {children}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
