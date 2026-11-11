"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/icon/Icon.jsx";

import Container from "@/components/container/Container.jsx";
import PageTitle from "@/components/pageTitle/PageTitle.jsx";
import MethodText from "@/components/methodText/MethodText.jsx";
import SearchInput from "@/components/searchInput/SearchInput.jsx";
import Filters from "@/components/filters/Filters.jsx";
import Dropdown from "@/components/dropdown/Dropdown.jsx";
import CardTile from "@/components/cardTile/CardTile.jsx";
import Pagination from "@/components/pagination/Pagination.jsx";
import CardImageModal from "@/components/cardImageModal/CardImageModal.jsx";

import { useAuth } from "@/contexts/AuthContext.jsx";
import useMySales from "@/hooks/useMySales.js";
import StatusChip from "@/components/statusChip/StatusChip.jsx";
import { media } from "@/styles/responsive.css";
import * as styles from "./MySales.css.js";

const PAGE_SIZE_DESKTOP = 15; // 3열 × 5행
const PAGE_SIZE_OTHER = 16; // 2열 × 8행 (태블릿·모바일)
const METHODS = ["PHOTO", "CRAFT", "AI", "ETC"];

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

const STATUS_OPTIONS = [
  { value: "ON_SALE", label: "판매 중" },
  { value: "SOLD_OUT", label: "품절" },
  { value: "OFFER_PENDING", label: "교환 제시 후 대기 중" },
  { value: "EXCHANGED", label: "교환 완료" },
];

// 이미지 위에 칩을 띄우는 상태
const CHIP_STATUSES = ["ON_SALE", "OFFER_PENDING"];
// 아직 내 소유인 상태 (판매·제안에 걸려 있을 뿐). 품절·교환 완료는 이미 남의 카드라
// 우클릭 저장을 막고 크게 보기도 열지 않는다
const OWNED_STATUSES = ["ON_SALE", "OFFER_PENDING"];

const FILTER_GROUPS = [
  { key: "method", label: "제작방식", options: METHOD_OPTIONS },
  { key: "genre", label: "장르", options: GENRE_OPTIONS },
  { key: "status", label: "거래 상태", options: STATUS_OPTIONS },
];

const SORT_OPTIONS = [
  { value: "LATEST", label: "최신순" },
  { value: "OLDEST", label: "오래된 순" },
];

export default function MySalesPage() {
  // 목록 조건
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState({}); // { method } / { genre } / { status } 중 하나
  const [sort, setSort] = useState("LATEST");
  const [page, setPage] = useState(1);
  const [viewingCard, setViewingCard] = useState(null);

  // 처음 열릴 때 화면 크기로 한 번 정한다
  const [pageSize] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(media.desktop).matches
      ? PAGE_SIZE_DESKTOP
      : PAGE_SIZE_OTHER,
  );

  const { cards, pagination, summary, loading, error } = useMySales({
    keyword,
    method: filter.method ?? null,
    genre: filter.genre ?? null,
    status: filter.status ?? null,
    sort,
    page,
    pageSize,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false); // 모바일 필터 패널

  const { user } = useAuth();
  const methodCounts = summary?.methodCounts;
  const totalCount = methodCounts
    ? METHODS.reduce((sum, method) => sum + methodCounts[method], 0)
    : 0;

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
      const isSearching =
        keyword || filter.method || filter.genre || filter.status;
      return (
        <p className={styles.message}>
          {isSearching
            ? "조건에 맞는 포토카드가 없습니다."
            : "거래 중인 포토카드가 없습니다."}
        </p>
      );
    }

    return (
      <>
        <div className={styles.grid}>
          {cards.map((card) => {
            const isOwned = OWNED_STATUSES.includes(card.status);
            return (
              <CardTile
                key={card.key}
                card={card}
                owned={isOwned}
                soldOut={card.status === "SOLD_OUT"}
                accepted={card.status === "EXCHANGED"}
                badge={
                  CHIP_STATUSES.includes(card.status) ? (
                    <StatusChip status={card.status} />
                  ) : undefined
                }
                rows={[
                  { label: "가격", value: `${card.price} P` },
                  { label: "잔여", value: card.quantity },
                ]}
                onClick={isOwned ? () => setViewingCard(card) : undefined}
              />
            );
          })}
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
        <PageTitle title="나의 거래 포토카드"></PageTitle>
        <section className={styles.summary} aria-label="보유 포토카드 요약">
          <h2 className={styles.owner}>
            {user?.nickname}님이 거래 중인 포토카드
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
      {viewingCard && (
        <CardImageModal
          card={viewingCard}
          onClose={() => setViewingCard(null)}
        />
      )}
    </main>
  );
}
