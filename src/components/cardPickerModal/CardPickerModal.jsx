"use client";

import { useState } from "react";
import Modal from "../modal/Modal.jsx";
import SearchInput from "../searchInput/SearchInput.jsx";
import Dropdown from "../dropdown/Dropdown.jsx";
import CardTile from "../cardTile/CardTile.jsx";
import useMyCards from "@/hooks/useMyCards.js";
import { media } from "@/styles/responsive.css";
import * as styles from "./CardPickerModal.css.js";

const METHOD_OPTIONS = [
  { value: "", label: "전체" },
  { value: "PHOTO", label: "촬영" },
  { value: "CRAFT", label: "제작" },
  { value: "AI", label: "AI생성" },
  { value: "ETC", label: "기타" },
];

const GENRE_OPTIONS = [
  { value: "", label: "전체" },
  { value: "LANDSCAPE", label: "풍경" },
  { value: "PORTRAIT", label: "인물" },
  { value: "ANIMAL", label: "동물" },
  { value: "PLANT", label: "식물" },
  { value: "OBJECT", label: "사물" },
  { value: "ETC", label: "기타" },
];

const PAGE_SIZE_DESKTOP = 15; // 3열 × 5행
const PAGE_SIZE_OTHER = 16; // 2열 × 8행 (태블릿·모바일)

export default function CardPickerModal({ title, onSelect, onClose }) {
  const [keyword, setKeyword] = useState("");
  const [method, setMethod] = useState(null);
  const [genre, setGenre] = useState(null);

  // 모달이 처음 열릴 때 화면 크기로 한 번 정한다 (서버에서 그릴 땐 window가 없다)
  const [pageSize] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(media.desktop).matches
      ? PAGE_SIZE_DESKTOP
      : PAGE_SIZE_OTHER,
  );

  const { cards, loading, error } = useMyCards({
    keyword,
    method,
    genre,
    pageSize,
  });

  const renderBody = () => {
    if (loading) {
      return <p className={styles.message}>불러오는 중…</p>;
    }
    if (error) {
      return (
        <p className={styles.message}>
          카드를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      );
    }
    if (cards.length === 0) {
      return (
        <p className={styles.message}>선택할 수 있는 보유 카드가 없습니다.</p>
      );
    }
    return (
      <div className={styles.grid}>
        {cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            owned
            rows={[
              { label: "가격", value: `${card.price} P` },
              { label: "수량", value: card.quantity },
            ]}
            onClick={() => onSelect(card)}
          />
        ))}
      </div>
    );
  };

  return (
    <Modal open onClose={onClose} size="xl" mobileType="full">
      <div className={styles.header}>
        <p className={styles.eyebrow}>마이갤러리</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.toolbar}>
        <SearchInput onSearch={setKeyword} />
        <div className={styles.filters}>
          <Dropdown
            variant="filter"
            placeholder="제작방식"
            options={METHOD_OPTIONS}
            value={method}
            onChange={(v) => setMethod(v || null)}
          />
          <Dropdown
            variant="filter"
            placeholder="장르"
            options={GENRE_OPTIONS}
            value={genre}
            onChange={(v) => setGenre(v || null)}
          />
        </div>
      </div>
      {renderBody()}
    </Modal>
  );
}
