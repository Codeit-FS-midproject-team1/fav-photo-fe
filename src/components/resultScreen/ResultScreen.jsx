"use client";

import { useRouter } from "next/navigation";
import * as styles from "./ResultScreen.css";
import Button from "@/components/button/Button";

/**
 * @typedef {{ text: string, href: string }} ResultAction
 */

/**
 * @param {{
 *   actions?: ResultAction[],
 *   title: string,
 *   message?: string
 * }} props
 */

export default function ResultScreen({
  success,
  title,
  message,
  actions = [],
}) {
  const router = useRouter();

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

        <div className={styles.actions}>
          {actions.map((action) => (
            <Button
              key={action.href}
              variant="secondary"
              size="L"
              thickness="thin"
              className={styles.actionButton}
              onClick={() => router.push(action.href)}
            >
              {action.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
