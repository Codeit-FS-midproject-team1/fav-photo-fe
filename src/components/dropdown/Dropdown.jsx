"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import * as styles from "./Dropdown.css.js";
import Icon from "../icon/Icon";
import Field from "../field/Field.jsx";

export default function Dropdown({
  variant = "box",
  options,
  value,
  onChange,
  placeholder,
  label,
  error,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const id = useId();
  const selected = options.find((option) => option.value === value);

  // 열려 있을 때 바깥 클릭, Esc로 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      if (ref.current.contains(document.activeElement))
        triggerRef.current.focus();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const select = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
    triggerRef.current.focus();
  };

  const dropdown = (
    <div ref={ref} className={styles.root[variant]}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-expanded={open}
        aria-invalid={!!error}
        className={clsx(styles.trigger[variant], error && styles.triggerError)}
        onClick={() => setOpen(!open)}
      >
        <span
          className={
            !selected && variant === "box" ? styles.placeholder : undefined
          }
        >
          {selected?.label ?? placeholder}
        </span>
        <Icon name={open ? "up" : "down"} size={variant === "box" ? 28 : 24} />
      </button>

      {open && (
        <ul className={styles.menu[variant]}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={styles.option}
                onClick={() => select(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return variant === "box" ? (
    <Field label={label} error={error} htmlFor={id}>
      {dropdown}
    </Field>
  ) : (
    dropdown
  );
}
