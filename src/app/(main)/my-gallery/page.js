"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/icon/Icon.jsx";

import Container from "@/components/container/Container.jsx";
import PageTitle from "@/components/pageTitle/PageTitle.jsx";
import Button from "@/components/button/Button.jsx";
import CardPickerModal from "@/components/cardPickerModal/CardPickerModal.jsx";
import MethodText from "@/components/methodText/MethodText.jsx";
import SearchInput from "@/components/searchInput/SearchInput.jsx";
import Filters from "@/components/filters/Filters.jsx";
import Dropdown from "@/components/dropdown/Dropdown.jsx";
import CardTile from "@/components/cardTile/CardTile.jsx";
import Pagination from "@/components/pagination/Pagination.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import useMyCards from "@/hooks/useMyCards.js";
import { media } from "@/styles/responsive.css";
import * as styles from "./MyGallery.css.js";

const PAGE_SIZE_DESKTOP = 15; // 3열 × 5행
const PAGE_SIZE_OTHER = 16; // 2열 × 8행 (태블릿·모바일)
// 여기부터
const METHODS = ["PHOTO", "CRAFT", "AI", "ETC"];
// 여기까지

const METHOD_OPTIONS = [
  { value: "PHOTO", label: "촬영" },
  { value: "CRAFT", label: "제작" },
  { value: "AI", label: "AI생성" },
  { value: "ETC", label: "기타" },
];

const GENRE_OPTIONS = [
  { value: "LANDSCAPE", label: "풍경" },
  { value: "PORTRAIT", label: "인물" },
  { value: "ANIMAL", label: "동물" },
  { value: "PLANT", label: "식물" },
  { value: "OBJECT", label: "사물" },
  { value: "ETC", label: "기타" },
];

const FILTER_GROUPS = [
  { key: "method", label: "제작방식", options: METHOD_OPTIONS },
  { key: "genre", label: "장르", options: GENRE_OPTIONS },
];

const SORT_OPTIONS = [
  { value: "LATEST", label: "최신순" },
  { value: "OLDEST", label: "오래된 순" },
  { value: "PRICE_ASC", label: "낮은 가격순" },
  { value: "PRICE_DESC", label: "높은 가격순" },
];

export default function MyGalleryPage() {
  // 목록 조건
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState({}); // { method } 또는 { genre } 하나만
  const [sort, setSort] = useState("LATEST");
  const [page, setPage] = useState(1);

  // 처음 열릴 때 화면 크기로 한 번 정한다
  const [pageSize] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(media.desktop).matches
      ? PAGE_SIZE_DESKTOP
      : PAGE_SIZE_OTHER,
  );

  const { cards, pagination, summary, loading, error } = useMyCards({
    keyword,
    method: filter.method ?? null,
    genre: filter.genre ?? null,
    sort,
    page,
    pageSize,
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 모바일 필터 패널

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);

  const handleSelect = () => {
    closePicker();
    // TODO: 판매 등록 모달이 생기면 card를 넘긴다 (card.id = photoCardId)
  };

  const { user } = useAuth();
  const methodCounts = summary?.methodCounts;
  const totalCount = methodCounts
    ? METHODS.reduce((sum, method) => sum + methodCounts[method], 0)
    : 0;

  const creation = user?.creation;
  const remainingCreation = creation
    ? Math.max(creation.limit - creation.used, 0)
    : null;
  const creationText =
    remainingCreation !== null
      ? `(${remainingCreation}/${creation.limit})`
      : "";

  // 검색·필터·정렬이 바뀌면 1페이지부터 다시 본다
  const changeKeyword = (next) => {
    setKeyword(next);
    setPage(1);
  };
  const changeFilter = (next) => {
    setFilter(next);
    setPage(1);
  };
  const changeSort = (next) => {
    setSort(next);
    setPage(1);
  };

  // 페이지를 바꾸면 목록 맨 위부터 보이게 올린다
  const changePage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderList = () => {
    if (loading) {
      return <p className={styles.message}>불러오는 중…</p>;
    }

    if (error) {
      return (
        <p className={styles.message} role="alert">
          카드를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      );
    }

    if (cards.length === 0) {
      const isSearching = keyword || filter.method || filter.genre;
      return (
        <p className={styles.message}>
          {isSearching
            ? "조건에 맞는 포토카드가 없습니다."
            : "보유한 포토카드가 없습니다."}
        </p>
      );
    }

    return (
      <>
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
            />
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={pagination?.totalPages ?? 1}
          onChange={changePage}
        />
      </>
    );
  };

  return (
    <main className={styles.page}>
      <Container>
        <PageTitle title="마이갤러리">
          <div className={styles.actions}>
            <Button
              href="/my-gallery/create"
              thickness="thin"
              className={styles.actionButton}
            >
              포토카드 생성하기({creationText})
            </Button>
            <Button
              thickness="thin"
              className={styles.actionButton}
              onClick={openPicker}
            >
              판매하기
            </Button>
          </div>
        </PageTitle>
        <section className={styles.summary} aria-label="보유 포토카드 요약">
          <h2 className={styles.owner}>
            {user?.nickname}님이 보유한 포토카드
            <span className={styles.total}>({totalCount}종)</span>
          </h2>
          <ul className={styles.chips}>
            {METHODS.map((method) => (
              <li key={method} className={styles.chip[method]}>
                <MethodText method={method} />
                <span>{methodCounts?.[method] ?? 0}종</span>
              </li>
            ))}
          </ul>
        </section>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.filterToggle}
            aria-label="필터"
            aria-expanded={isFilterOpen}
            aria-controls="gallery-filter-panel"
            onClick={() => setIsFilterOpen((open) => !open)}
          >
            <Icon name="filter" />
          </button>

          <div className={styles.search}>
            <SearchInput onSearch={changeKeyword} />
          </div>

          <div
            id="gallery-filter-panel"
            className={clsx(styles.panel, isFilterOpen && styles.panelOpen)}
          >
            <div className={styles.filters}>
              <Filters
                groups={FILTER_GROUPS}
                values={filter}
                onChange={changeFilter}
              />
            </div>
            <div className={styles.sortBox}>
              <Dropdown
                variant="sort"
                options={SORT_OPTIONS}
                value={sort}
                onChange={changeSort}
              />
            </div>
          </div>
        </div>
        {renderList()}
      </Container>

      {/* 모바일: 화면 하단 고정 바 */}
      <div className={styles.mobileBar}>
        <p className={styles.mobileBarTitle}>나의 포토카드</p>
        <div className={styles.mobileBarButtons}>
          <Button
            href="/my-gallery/create"
            thickness="compact"
            className={styles.mobileButton}
          >
            생성하기
          </Button>
          <Button
            thickness="compact"
            className={styles.mobileButton}
            onClick={openPicker}
          >
            판매하기
          </Button>
        </div>
      </div>

      {isPickerOpen && (
        <CardPickerModal
          title="나의 포토카드 판매하기"
          onSelect={handleSelect}
          onClose={closePicker}
        />
      )}
    </main>
  );
}
