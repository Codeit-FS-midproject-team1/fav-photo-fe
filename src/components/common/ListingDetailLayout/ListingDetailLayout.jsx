"use client";

import * as styles from "./ListingDetailLayout.css.js";

const METHOD_LABELS = {
  PHOTO: "촬영",
  CRAFT: "제작",
  AI: "AI생성",
  ETC: "기타",
};

const GENRE_LABELS = {
  LANDSCAPE: "풍경",
  PORTRAIT: "인물",
  ANIMAL: "동물",
  PLANT: "식물",
  OBJECT: "사물",
  ETC: "기타",
};

function displayText(value, fallback = "정보 없음") {
  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return fallback;
}

function formatNumber(value, suffix = "") {
  if (value === null || value === undefined || value === "") {
    return "정보 없음";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "정보 없음";
  }

  return `${number.toLocaleString("ko-KR")}${suffix}`;
}

function getOptionLabel(labels, value) {
  if (typeof value !== "string") {
    return "선택 안 함";
  }

  const normalized = value.trim();

  return labels[normalized] || normalized || "선택 안 함";
}

/**
 * 판매 포토카드 상세 화면 공통 레이아웃
 *
 * listing: 판매글 상세 데이터
 * actions: 구매하기, 수정하기, 판매 내리기 등의 버튼
 * exchangeContent: 교환 정보 영역을 대체할 JSX
 * media: 카드 이미지 영역을 대체할 JSX
 * children: 상세 화면 아래에 추가할 내용
 *
 * API 호출이나 버튼 동작은 부모에서 처리합니다.
 */
export default function ListingDetailLayout({
  listing,
  actions,
  exchangeContent,
  media,
  children,
}) {
  const photoCard =
    listing?.photoCard ?? listing?.photo_card ?? listing?.card ?? {};

  const cardName = displayText(
    photoCard.name ?? listing?.cardName ?? listing?.name,
    "포토카드",
  );

  const imageUrl =
    photoCard.imageUrl ||
    photoCard.image_url ||
    listing?.imageUrl ||
    listing?.image_url ||
    "";

  const method = getOptionLabel(
    METHOD_LABELS,
    photoCard.method ?? listing?.method,
  );

  const genre = getOptionLabel(GENRE_LABELS, photoCard.genre ?? listing?.genre);

  const sellerName = displayText(
    listing?.seller?.nickname ??
      listing?.sellerNickname ??
      listing?.seller_nickname,
  );

  const price = formatNumber(listing?.price, "P");

  const remainingQuantity = formatNumber(
    listing?.remainingQuantity ?? listing?.remaining_quantity,
    "장",
  );

  const exchangeMethod = getOptionLabel(
    METHOD_LABELS,
    listing?.exchangeMethod ?? listing?.exchange_method,
  );

  const exchangeGenre = getOptionLabel(
    GENRE_LABELS,
    listing?.exchangeGenre ?? listing?.exchange_genre,
  );

  const exchangeDescription = displayText(
    listing?.exchangeDescription ?? listing?.exchange_description,
    "별도의 교환 희망 내용이 없습니다.",
  );

  return (
    <article className={styles.container}>
      <div className={styles.main}>
        {/* 왼쪽: 포토카드 이미지 */}
        <div className={styles.mediaFrame}>
          {media ??
            (imageUrl ? (
              <div
                className={styles.mediaImage}
                role="img"
                aria-label={`${cardName} 이미지`}
                style={{
                  backgroundImage: `url(${JSON.stringify(imageUrl)})`,
                }}
              />
            ) : (
              <div className={styles.mediaPlaceholder}>
                <span>이미지가 없습니다.</span>
              </div>
            ))}
        </div>

        {/* 오른쪽: 판매 상세 정보 */}
        <div className={styles.detail}>
          <header className={styles.header}>
            <h1 className={styles.title}>{cardName}</h1>

            <div className={styles.tags}>
              <span className={styles.tag}>{method}</span>

              <span className={styles.tag}>{genre}</span>
            </div>
          </header>

          {/* 판매자 및 가격 정보 */}
          <dl className={styles.infoList}>
            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>판매자</dt>
              <dd className={styles.infoValue}>{sellerName}</dd>
            </div>

            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>가격</dt>
              <dd className={styles.price}>{price}</dd>
            </div>

            <div className={styles.infoRow}>
              <dt className={styles.infoLabel}>남은 수량</dt>
              <dd className={styles.infoValue}>{remainingQuantity}</dd>
            </div>
          </dl>

          {/* 교환 희망 정보 */}
          <section className={styles.exchangeSection}>
            <h2 className={styles.sectionTitle}>교환 희망 정보</h2>

            {exchangeContent !== undefined ? (
              exchangeContent
            ) : (
              <>
                <dl className={styles.exchangeList}>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>희망 제작 방식</dt>
                    <dd className={styles.infoValue}>{exchangeMethod}</dd>
                  </div>

                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>희망 장르</dt>
                    <dd className={styles.infoValue}>{exchangeGenre}</dd>
                  </div>
                </dl>

                <div className={styles.descriptionBox}>
                  <h3 className={styles.descriptionTitle}>교환 희망 내용</h3>

                  <p className={styles.exchangeDescription}>
                    {exchangeDescription}
                  </p>
                </div>
              </>
            )}
          </section>

          {/* 구매자/판매자별 버튼 */}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>

      {/* 교환 제시 목록 등 추가 영역 */}
      {children && <div className={styles.extraContent}>{children}</div>}
    </article>
  );
}
