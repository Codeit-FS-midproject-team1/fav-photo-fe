"use client";

import { useState } from "react";
import clsx from "clsx";
import Icon from "@/components/icon/Icon.jsx";
import { useRouter } from "next/navigation";

import Container from "@/components/container/Container.jsx";
import PageTitle from "@/components/pageTitle/PageTitle.jsx";
import Button from "@/components/button/Button.jsx";
import CardPickerModal from "@/components/cardPickerModal/CardPickerModal.jsx";
import CardImageModal from "@/components/cardImageModal/CardImageModal.jsx";
import MethodText from "@/components/methodText/MethodText.jsx";
import SearchInput from "@/components/searchInput/SearchInput.jsx";
import Filters from "@/components/filters/Filters.jsx";
import Dropdown from "@/components/dropdown/Dropdown.jsx";
import CardTile from "@/components/cardTile/CardTile.jsx";
import Pagination from "@/components/pagination/Pagination.jsx";
import ListingFormModal from "@/components/common/ListingFormModal/ListingFormModal.jsx";

import { createSaleListing } from "@/lib/api/saleListings.js";
import { isRequestResultUncertain } from "@/lib/isRequestResultUncertain.js";
import { useAuth } from "@/contexts/AuthContext.jsx";
import useMyCards from "@/hooks/useMyCards.js";
import { media } from "@/styles/responsive.css";
import * as styles from "./MyGallery.css.js";

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
  const [viewingCard, setViewingCard] = useState(null); // 크게 보고 있는 카드
  const [sellingCard, setSellingCard] = useState(null); // 판매 등록 중인 카드
  const [isLeaving, setIsLeaving] = useState(false); // 결과 화면으로 이동 중

  const router = useRouter();

  const openPicker = () => setIsPickerOpen(true);
  const closePicker = () => setIsPickerOpen(false);

  const handleSelect = (card) => {
    closePicker();
    setSellingCard(card); // card.id = photoCardId, card.quantity = 보유 수량
  };

  const { user, accessToken } = useAuth();

  const handleSellSubmit = async (formValues) => {
    let created;
    try {
      created = await createSaleListing(
        sellingCard.id,
        formValues,
        accessToken,
      );
    } catch (error) {
      // 서버에 등록됐을 수도 있는 경우: 모달에 안내만 띄운다 (중복 등록 방지)
      if (isRequestResultUncertain(error)) {
        throw new Error(
          "판매 등록 결과를 확인하지 못했습니다. 다시 등록하기 전에 나의 판매 내역을 확인해 주세요.",
        );
      }
      // 서버가 실패를 분명히 알려 준 경우: 실패 화면으로 이동
      const params = new URLSearchParams({
        name: sellingCard.name ?? "포토카드",
        count: String(formValues.quantity),
        reason: error?.message || "판매 등록 요청을 처리하지 못했습니다.",
      });
      setIsLeaving(true);
      router.push(`/result/sell/fail?${params.toString()}`);
      return;
    }

    setIsLeaving(true);
    // 성공했는데 응답에 id가 없으면 판매 내역으로 보낸다
    if (created?.id == null) {
      router.push("/my-sales");
      return;
    }
    router.push(`/sell/success/${encodeURIComponent(String(created.id))}`);
  };

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

  // 남은 횟수가 0일 때만 막기.
  const canCreate = remainingCreation !== 0;

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
              onClick={() => setViewingCard(card)}
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
              disabled={!canCreate}
            >
              포토카드 생성하기{creationText}
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
            disabled={!canCreate}
          >
            생성하기{creationText}
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

      {viewingCard && (
        <CardImageModal
          card={viewingCard}
          onClose={() => setViewingCard(null)}
        />
      )}

      {sellingCard && (
        <ListingFormModal
          key={sellingCard.id}
          card={sellingCard}
          maxQuantity={sellingCard.quantity}
          onSubmit={handleSellSubmit}
          onClose={() => setSellingCard(null)}
          isSubmitting={isLeaving}
        />
      )}
    </main>
  );
}
