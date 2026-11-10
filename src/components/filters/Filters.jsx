"use client";

import * as styles from "./Filters.css.js";
import Dropdown from "../dropdown/Dropdown";

// 필터는 한 번에 하나만. 다른 필터를 고르면 앞의 값은 지워지고, 같은 값을 다시 고르면 해제된다
export default function Filters({ groups, values, onChange }) {
  const select = (key, value) =>
    onChange(values[key] === value ? {} : { [key]: value });

  return (
    <div className={styles.filters}>
      {groups.map(({ key, label, options }) => (
        <Dropdown
          key={key}
          variant="filter"
          placeholder={label}
          options={options}
          value={values[key]}
          onChange={(value) => select(key, value)}
        />
      ))}
    </div>
  );
}
