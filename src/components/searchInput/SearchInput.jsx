"use client";

import * as styles from "./SearchInput.css.js";
import Icon from "../icon/Icon";

export default function SearchInput({
  onSearch,
  placeholder = "검색",
  defaultValue,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(new FormData(e.currentTarget).get("keyword").trim());
  };

  return (
    <form role="search" className={styles.form} onSubmit={handleSubmit}>
      <input
        name="keyword"
        aria-label="검색어"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={styles.input}
      />
      <button type="submit" aria-label="검색" className={styles.button}>
        <Icon name="search" />
      </button>
    </form>
  );
}
