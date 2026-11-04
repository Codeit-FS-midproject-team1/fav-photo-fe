"use client";

import { useRouter } from "next/navigation";
import * as styles from "./ResultScreen.css";
import Button from "@/components/button/Button";

export default function ResultScreen({
  success,
  title,
  message,
  actionText,
  actionHref,
}) {
  const router = useRouter();

  const handleAction = () => {
    if (actionHref) router.push(actionHref);
  };

  return (
    <section className={styles.screen}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {title}
          <span className={success ? styles.success : styles.failure}>
            {success ? " 성공" : " 실패"}
          </span>
        </h1>

        {message && <p className={styles.message}>{message}</p>}

        {actionText && (
          <Button
            variant="secondary"
            size="L"
            thickness="thin"
            className={styles.actionButton}
            onClick={handleAction}
          >
            {actionText}
          </Button>
        )}
      </div>
    </section>
  );
}
