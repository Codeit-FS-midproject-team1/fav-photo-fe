"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import * as styles from "./Filters.css.js";
import Dropdown from "../dropdown/Dropdown";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import resetIcon from "@/assets/images/reset.svg";

// 필터마다 값은 하나씩. 같은 값을 다시 고르면 그 필터만 해제된다
const toggle = (values, key, value) => {
  const { [key]: current, ...rest } = values;
  return current === value ? rest : { ...rest, [key]: value };
};

// PC·태블릿은 드롭다운. mobileSheet 를 주면 모바일에서 필터 아이콘 -> 바텀시트로 바뀐다
export default function Filters({
  groups,
  values,
  onChange,
  mobileSheet = false,
  getCount,
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className={clsx(styles.filters, mobileSheet && styles.hideOnMobile)}>
        {groups.map(({ key, label, options }) => (
          <Dropdown
            key={key}
            variant="filter"
            placeholder={label}
            options={options}
            value={values[key]}
            onChange={(value) => onChange(toggle(values, key, value))}
          />
        ))}
      </div>

      {mobileSheet && (
        <button
          type="button"
          aria-label="필터"
          className={styles.sheetToggle}
          onClick={() => setSheetOpen(true)}
        >
          <Icon name="filter" />
        </button>
      )}

      {sheetOpen && (
        <FilterSheet
          groups={groups}
          values={values}
          getCount={getCount}
          onApply={(next) => {
            onChange(next);
            setSheetOpen(false);
          }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  );
}

// 시트 안에서는 바로 적용하지 않고, "포토 보기"를 눌러야 적용한다
function FilterSheet({ groups, values, getCount, onApply, onClose }) {
  const [tab, setTab] = useState(groups[0].key);
  const [draft, setDraft] = useState(values);
  const [count, setCount] = useState(null);
  const group = groups.find(({ key }) => key === tab);

  // 고른 조건으로 몇 장이 나오는지 미리 센다 ("N개 포토보기")
  useEffect(() => {
    if (!getCount) return;
    let cancelled = false;
    getCount(draft)
      .then((n) => {
        if (!cancelled) setCount(n);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [draft, getCount]);

  return (
    <Modal open onClose={onClose} label="필터">
      <p className={styles.sheetTitle}>필터</p>

      <div role="tablist" className={styles.tabs}>
        {groups.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={key === tab}
            className={clsx(styles.tab, key === tab && styles.tabActive)}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className={styles.options}>
        {group.options.map(({ value, label }) => (
          <li key={value}>
            <button
              type="button"
              aria-pressed={draft[tab] === value}
              className={clsx(
                styles.option,
                draft[tab] === value && styles.optionSelected,
              )}
              onClick={() => setDraft(toggle(draft, tab, value))}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.sheetFooter}>
        <button
          type="button"
          aria-label="초기화"
          className={styles.reset}
          onClick={() => setDraft({})}
        >
          <Image src={resetIcon} alt="" width={24} height={24} />
        </button>
        <button
          type="button"
          className={styles.apply}
          onClick={() => onApply(draft)}
        >
          {count === null ? "포토 보기" : `${count}개 포토보기`}
        </button>
      </div>
    </Modal>
  );
}
