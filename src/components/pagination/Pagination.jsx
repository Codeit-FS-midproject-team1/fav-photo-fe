"use client";
import * as styles from "./Pagination.css.js";
import clsx from "clsx";
import Icon from "@/components/icon/Icon.jsx";

const ELLIPSIS = "ellipsis";
const DESKTOP = { sideCount: 3, collapseFrom: 8 };
const MOBILE = { sideCount: 2, collapseFrom: 6 };

function range(start, count) {
  return Array.from({ length: count }, (_, index) => start + index);
}

function getPageItems(totalPages, page, { sideCount, collapseFrom }) {
  // 페이지가 적으면 전부 표시
  if (totalPages < collapseFrom) {
    return range(1, totalPages);
  }

  // 페이지가 생략 구간인지 판별
  const isHidden = page > sideCount && page <= totalPages - sideCount;

  if (!isHidden) {
    return [
      ...range(1, sideCount),
      ELLIPSIS,
      ...range(totalPages - sideCount + 1, sideCount),
    ];
  }

  // 현재 페이지가 생략 구간이면 앞뒤를 하나씩 줄이고 현재 번호를 넣음
  const visible = [
    ...range(1, sideCount - 1),
    page,
    ...range(totalPages - sideCount + 2, sideCount - 1),
  ];

  const items = [];
  visible.forEach((pageNumber, index) => {
    const gap = pageNumber - visible[index - 1];
    if (gap === 2) items.push(pageNumber - 1);
    if (gap > 2) items.push(ELLIPSIS);
    items.push(pageNumber);
  });

  return items;
}

function PageList({ items, page, onChange, className }) {
  return (
    <div className={className}>
      {items.map((item, index) =>
        item === ELLIPSIS ? (
          <span
            key={`ellipsis-${index}`}
            className={styles.ellipsis}
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={clsx(
              styles.pageButton,
              item === page && styles.activePage,
            )}
            onClick={() => onChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
}

export default function Pagination({ page, totalPages, onChange }) {
  const lastPage = Math.max(totalPages, 1);
  const currentPage = Math.min(Math.max(page, 1), lastPage);

  return (
    <nav className={styles.pagination} aria-label="페이지 이동">
      <button
        type="button"
        className={styles.arrowButton}
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        <Icon name="left" />
      </button>

      <PageList
        items={getPageItems(lastPage, currentPage, DESKTOP)}
        page={currentPage}
        onChange={onChange}
        className={styles.desktopList}
      />
      <PageList
        items={getPageItems(lastPage, currentPage, MOBILE)}
        page={currentPage}
        onChange={onChange}
        className={styles.mobileList}
      />

      <button
        type="button"
        className={styles.arrowButton}
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        aria-label="다음 페이지"
      >
        <Icon name="right" />
      </button>
    </nav>
  );
}
