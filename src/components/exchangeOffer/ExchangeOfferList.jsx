"use client";

import CardTile from "@/components/cardTile/CardTile";
import * as styles from "./ExchangeOfferList.css.js";

const STATUS_LABELS = {
  PENDING: "대기 중",
  ACCEPTED: "승인 완료",
  REJECTED: "거절됨",
  CANCELED: "취소됨",
};

const formatCreatedAt = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(date);
};

export default function ExchangeOfferList({
  items = [],
  viewerRole = "offerer",
  loading = false,
  error = "",
  onCancel,
  onReject,
  onAccept,
}) {
  const isSeller = viewerRole === "seller";

  if (loading) {
    return (
      <p className={styles.emptyMessage} role="status">
        교환 제안을 불러오는 중입니다.
      </p>
    );
  }

  if (error) {
    return (
      <p className={styles.emptyMessage} role="alert">
        {error}
      </p>
    );
  }

  if (items.length === 0) {
    return <p className={styles.emptyMessage}>등록된 교환 제안이 없습니다.</p>;
  }

  return (
    <section
      className={styles.section}
      aria-label={isSeller ? "받은 교환 제안" : "내 교환 제안"}
    >
      <h2 className={styles.title}>
        {isSeller ? "받은 교환 제안" : "내가 제시한 교환"}
      </h2>

      <ul className={styles.list}>
        {items.map((offer) => {
          const { id, status, description, card, offererNickname, createdAt } =
            offer;

          const isPending = status === "PENDING";

          return (
            <li key={id} className={styles.item}>
              <article className={styles.article}>
                <div className={styles.cardWrapper}>
                  {card ? (
                    <CardTile
                      card={card}
                      rows={
                        card.price != null
                          ? [
                              {
                                label: "가격",
                                value: `${card.price} P`,
                              },
                            ]
                          : []
                      }
                    />
                  ) : (
                    <p className={styles.secondaryText}>
                      교환 제시 카드 정보를 확인할 수 없습니다.
                    </p>
                  )}
                </div>

                <div className={styles.detail}>
                  <div>
                    <span className={styles.status}>
                      {STATUS_LABELS[status] ?? status}
                    </span>
                  </div>

                  {isSeller && offererNickname && (
                    <p className={styles.secondaryText}>
                      제안자: {offererNickname}
                    </p>
                  )}

                  {description && (
                    <p className={styles.description}>{description}</p>
                  )}

                  {createdAt && (
                    <time className={styles.secondaryText} dateTime={createdAt}>
                      {formatCreatedAt(createdAt)}
                    </time>
                  )}

                  {isPending && (
                    <div className={styles.actions}>
                      {!isSeller && onCancel && (
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => onCancel(offer)}
                        >
                          제안 취소
                        </button>
                      )}

                      {isSeller && onReject && (
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => onReject(offer)}
                        >
                          거절
                        </button>
                      )}

                      {isSeller && onAccept && (
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => onAccept(offer)}
                        >
                          승인
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
