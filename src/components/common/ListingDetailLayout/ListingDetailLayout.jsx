          ) : (
            <span className={styles.imagePlaceholder}>이미지 없음</span>
          )}
        </div>

        <section className={styles.information} aria-label="판매 정보">
          <span className={styles.status}>
            {STATUS_LABELS[status] ?? status}
          </span>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.meta}>
            {[METHOD_LABELS[method] ?? method, GENRE_LABELS[genre] ?? genre]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <dl className={styles.details}>
            <div className={styles.detailsRow}>
              <dt className={styles.detailsTerm}>판매자</dt>
              <dd className={styles.detailsValue}>{sellerName}</dd>
            </div>

            <div className={styles.detailsRow}>
              <dt className={styles.detailsTerm}>판매 가격</dt>
              <dd className={styles.detailsValue}>
                {Number(listing.price ?? 0).toLocaleString("ko-KR")}P
              </dd>
            </div>

            <div className={styles.detailsRow}>
              <dt className={styles.detailsTerm}>남은 수량</dt>
              <dd className={styles.detailsValue}>{remaining}장</dd>
            </div>
          </dl>
          {description && <p className={styles.description}>{description}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </section>
      </div>

      <section className={styles.exchangeInfo} aria-label="교환 희망 정보">
        <h2 className={styles.sectionTitle}>교환 희망 정보</h2>
        <p className={styles.exchangeText}>
          제작 방식:{" "}
          {METHOD_LABELS[exchangeMethod] || exchangeMethod || "선택 안 함"}
        </p>
        <p className={styles.exchangeText}>
          장르: {GENRE_LABELS[exchangeGenre] || exchangeGenre || "선택 안 함"}
        </p>
        <p className={styles.exchangeDescription}>
          {exchangeDescription || "별도의 교환 희망 내용이 없습니다."}
        </p>
      </section>

      {exchangeContent && (
        <section className={styles.extra}>{exchangeContent}</section>
      )}
      {children && <section className={styles.extra}>{children}</section>}
    </article>
  );
}
