"use client";

import Image from "next/image.js";
import Link from "next/link.js";
import clsx from "clsx";
import * as styles from "./CardTile.css.js";
import MethodText from "../methodText/MethodText.jsx";
import logoImage from "@/assets/images/logo.svg";
import soldOutImage from "@/assets/images/soldout.svg";

const GENRE_LABEL = {
  LANDSCAPE: "풍경",
  PORTRAIT: "인물",
  ANIMAL: "동물",
  PLANT: "식물",
  OBJECT: "사물",
  ETC: "기타",
};

// 내 카드가 아니면 우클릭, 드래그로 이미지 저장을 막음
const blockSave = (e) => e.preventDefault();

export default function CardTile({
  card,
  rows = [],
  soldOut = false,
  badge,
  owned = false,
  href,
  onClick,
}) {
  const Root = href ? Link : onClick ? "button" : "div";
  const rootProps = href
    ? { href }
    : onClick
      ? { onClick, type: "button" }
      : {};

  return (
    <Root {...rootProps} className={styles.card}>
      <div className={styles.imageBox}>
        {/* eslint-disable-next-line @next/next/no-img-element -- 서버 이미지 주소가 정해지면 next/image 로  */}
        <img
          src={card.imageUrl}
          alt={card.name}
          className={clsx(styles.image, soldOut && styles.dimmed)}
          draggable={owned}
          onContextMenu={owned ? undefined : blockSave}
        />
        {soldOut && (
          <Image src={soldOutImage} alt="SOLD OUT" className={styles.soldOut} />
        )}
        {badge && <div className={styles.badge}>{badge}</div>}
      </div>

      <div className={styles.info}>
        <strong className={styles.name}>{card.name}</strong>
        <div className={styles.meta}>
          <span className={styles.tags}>
            <MethodText method={card.method} />
            <span className={styles.bar}>|</span>
            <span className={styles.genre}>{GENRE_LABEL[card.genre]}</span>
          </span>
          <span className={styles.nickname}>{card.nickname}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <dl className={styles.rows}>
        {rows.map(({ label, value, total }) => (
          <div key={label} className={styles.row}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>
              {value}
              {total !== undefined && (
                <span className={styles.total}>/ {total}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <Image
        src={logoImage}
        alt=""
        width={99}
        height={18}
        className={styles.logo}
      />
    </Root>
  );
}
