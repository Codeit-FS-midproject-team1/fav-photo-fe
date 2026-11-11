"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/container/Container";
import PageTitle from "@/components/pageTitle/PageTitle";
import Button from "@/components/button/Button";
import SearchInput from "@/components/searchInput/SearchInput";
import Filters from "@/components/filters/Filters";
import Dropdown from "@/components/dropdown/Dropdown";
import { useAuth } from "@/contexts/AuthContext";
import MarketList from "./MarketList";
import * as styles from "./Marketplace.css.js";

const FILTER_GROUPS = [
  {
    key: "method",
    label: "제작 방식",
    options: [
      { value: "PHOTO", label: "촬영" },
      { value: "CRAFT", label: "제작" },
      { value: "AI", label: "AI생성" },
      { value: "ETC", label: "기타" },
    ],
  },
  {
    key: "genre",
    label: "장르",
    options: [
      { value: "LANDSCAPE", label: "풍경" },
      { value: "PORTRAIT", label: "인물" },
      { value: "ANIMAL", label: "동물" },
      { value: "PLANT", label: "식물" },
      { value: "OBJECT", label: "사물" },
      { value: "ETC", label: "기타" },
    ],
  },
  {
    key: "soldOut",
    label: "매진여부",
    options: [
      { value: "false", label: "판매 중" },
      { value: "true", label: "판매 완료" },
    ],
  },
];

const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "오래된 순" },
  { value: "priceLow", label: "낮은 가격순" },
  { value: "priceHigh", label: "높은 가격순" },
];

export default function MarketplacePage() {
  const { accessToken, isAuthLoading } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("latest");
  const query = { keyword, ...filter, sort };

  return (
    <Container>
      <main className={styles.page}>
        <PageTitle title="마켓플레이스">
          <Button href="/sell" thickness="thin">
            나의 포토카드 판매하기
          </Button>
        </PageTitle>

        <div className={styles.toolbar}>
          <div className={styles.searchAndFilters}>
            <SearchInput onSearch={setKeyword} />
            <Filters
              groups={FILTER_GROUPS}
              values={filter}
              onChange={setFilter}
            />
          </div>
          <Dropdown
            variant="sort"
            options={SORT_OPTIONS}
            value={sort}
            onChange={setSort}
          />
        </div>

        {isAuthLoading ? (
          <p className={styles.message}>불러오는 중이에요.</p>
        ) : !accessToken ? (
          <Link className={styles.message} href="/login">
            로그인 후 이용해 주세요.
          </Link>
        ) : (
          // 조건이 바뀌면 key 가 바뀌어 목록을 처음부터 다시 불러온다
          <MarketList
            key={JSON.stringify(query)}
            accessToken={accessToken}
            query={query}
          />
        )}
      </main>
    </Container>
  );
}
