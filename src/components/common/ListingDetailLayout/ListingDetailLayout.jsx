
import Image from "next/image";
import * as styles from "./ListingDetailLayout.css.js";

const METHOD_LABELS = {
  PHOTO: "사진",
  CRAFT: "수공예",
  AI: "AI",
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

const STATUS_LABELS = {
  ON_SALE: "판매 중",
  SOLD_OUT: "품절",
  CANCELED: "판매 취소",
};

/**
 * 판매 상세 공통 레이아웃.
 * 버튼과 교환 UI는 props(slot)로 전달합니다.
 * 기본 데이터 형태는
 * { photoCard, seller, remainingQuantity, price, ... }입니다.
 */
export default function ListingDetailLayout({
  listing,
  actions = null,
  exchangeContent = null,
  children = null,
}) {
  if (!listing) return null;

  const card = listing.photoCard ?? listing.photo_card ?? listing.card ?? {};

  const name = card.name ?? listing.name ?? "이름 없는 포토카드";

  const imageUrl =
    card.imageUrl ?? card.image_url ?? listing.imageUrl ?? listing.image_url;

  const sellerName =
    listing.seller?.nickname ??
    listing.sellerNickname ??
    listing.seller_nickname ??
    "-";

  const method = card.method ?? listing.method;
  const genre = card.genre ?? listing.genre;
  const description = card.description ?? listing.description;

  const remaining =
    listing.remainingQuantity ?? listing.remaining_quantity ?? 0;

  const status = listing.status ?? "ON_SALE";

  const exchangeMethod =
    listing.exchangeMethod ?? listing.exchange_method;

  const exchangeGenre =
    listing.exchangeGenre ?? listing.exchange_genre;

  const exchangeDescription =
    listing.exchangeDescription ?? listing.exchange_description;

  return (
    <article className={styles.page}>
      <div className={styles.main}>
        <div className={styles.imageFrame}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} 포토카드 이미지`}
              width={600}
              height={600}
              sizes="(max-width: 720px) 100vw, 48vw"
              unoptimized
              className={styles.image}
            />
          ) : (
            <span className={styles.imagePlaceholder}>
              이미지 없음
            </span>
          )}
        </div>

        <section
          className={styles.information}
          aria-label="판매 정보"
        >
          <span className={styles.status}>
            {STATUS_LABELS[status] ?? status}
          </span>

          <h1 className={styles.name}>{name}</h1>

          <p className={styles.meta}>
            {[
              METHOD_LABELS[method] ?? method,
              GENRE_LABELS[genre] ?? genre,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>

          <dl className={styles.details}>
            <div className={styles.detailsRow}>
              <dt className={styles.detailsTerm}>
                판매자
              </dt>
              <dd className={styles.detailsValue}>
                {sellerName}
              </dd>
            </div>

            <div className={styles.detailsRow}>
              <dt className={styles.detailsTerm}>
                판매 가격
              </dt>
              <dd className={styles.detailsValue}>
                {Number(listing.price ?? 0).toLocaleString("ko-KR")}P
              </dd>
            </div>

            <div className={styles.detailsRow}>
              <dt className={styles.detailsTerm}>
                남은 수량
              </dt>
              <dd className={styles.detailsValue}>
                {remaining}장
              </dd>
            </div>
          </dl>

          {description && (
            <p className={styles.description}>
              {description}
            </p>
          )}

          {actions && (
            <div className={styles.actions}>
              {actions}
            </div>
          )}
        </section>
      </div>

      <section
        className={styles.exchangeInfo}
        aria-label="교환 희망 정보"
      >
        <h2 className={styles.sectionTitle}>
          교환 희망 정보
        </h2>

        <p className={styles.exchangeText}>
          제작 방식:{" "}
          {METHOD_LABELS[exchangeMethod] ||
            exchangeMethod ||
            "선택 안 함"}
        </p>

        <p className={styles.exchangeText}>
          장르:{" "}
          {GENRE_LABELS[exchangeGenre] ||
            exchangeGenre ||
            "선택 안 함"}
        </p>

        <p className={styles.exchangeDescription}>
          {exchangeDescription ||
            "별도의 교환 희망 내용이 없습니다."}
        </p>
      </section>

      {exchangeContent && (
        <section className={styles.extra}>
          {exchangeContent}
        </section>
      )}

      {children && (
        <section className={styles.extra}>
          {children}
        </section>
      )}
    </article>
  );
}
