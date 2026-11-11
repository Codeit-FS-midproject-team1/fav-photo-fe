"use client";

import * as styles from "./Filters.css.js";
import Dropdown from "../dropdown/Dropdown";

// 필터마다 값은 하나씩. 같은 값을 다시 고르면 그 필터만 해제된다
export default function Filters({ groups, values, onChange }) {
  const select = (key, value) => {
    const { [key]: current, ...rest } = values;
    onChange(current === value ? rest : { ...rest, [key]: value });
  };

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
