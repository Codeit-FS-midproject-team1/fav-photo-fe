"use client";

import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import Icon from "@/components/icon/Icon.jsx";
import * as styles from "./RandomPointModal.css.js";

export default function RandomPointModal({
  open,
  onClose,
  onDraw,
  loading = false,
  result = null,
  error = "",
  limitReached = false,
}) {
  const used = result?.randomPoint?.used;
  const limit = result?.randomPoint?.limit ?? 3;

  const remaining = typeof used === "number" ? Math.max(0, limit - used) : null;

  const exhausted = remaining === 0 || limitReached;

  return (
    <Modal open={open} onClose={onClose} size="lg" mobileType="full">
      <section className={styles.content}>
        <p className={styles.eyebrow}>랜덤 포인트</p>

        <h2 className={styles.title}>
          <span className={styles.titleAccent}>포인트</span> 상자 뽑기
        </h2>

        <p className={styles.description}>
          하루 최대 3번, 한 번에 5~15P를 받을 수 있어요!
        </p>

        <div className={styles.giftBox} aria-hidden="true">
          <Icon name="randomBox3d" />
        </div>

        <div className={styles.usage}>
          {exhausted ? (
            <p>
              오늘의 뽑기를 모두 사용했어요. <strong>0 / {limit}</strong>
            </p>
          ) : remaining === null ? (
            <p>오늘의 사용 횟수는 뽑기 후 확인할 수 있어요.</p>
          ) : (
            <p>
              오늘 남은 횟수{" "}
              <strong>
                {remaining} / {limit}
              </strong>
            </p>
          )}
        </div>

        {result && (
          <div className={styles.result} role="status">
            <p>축하합니다!</p>
            <strong>+{result.earned} P</strong>
            <p>현재 보유 포인트: {result.points} P</p>
          </div>
        )}

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <Button
          type="button"
          variant="primary"
          className={styles.drawButton}
          onClick={onDraw}
          disabled={!onDraw || loading || exhausted}
        >
          {loading
            ? "뽑는 중..."
            : exhausted
              ? "오늘의 뽑기 완료"
              : "포인트 뽑기"}
        </Button>

        <p className={styles.notice}>
          뽑기 횟수는 매일 자정(한국 시간)에 초기화됩니다.
        </p>
      </section>
    </Modal>
  );
}
