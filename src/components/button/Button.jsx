import * as styles from "./Button.css.js";
import clsx from "clsx";

const variantStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
};

/**
 * @typedef {import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
 *   variant?: "primary" | "secondary";
 *   size?: "L" | "M" | "S" | "XS";
 *   thickness?: "thick" | "thin";
 * }} ButtonProps
 */

/** @param {ButtonProps} props */

export default function Button({
  children,
  variant = "primary",
  size = "L",
  thickness = "thick",
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  const classNames = clsx(
    styles.button,
    variantStyles[variant] ?? variantStyles.primary,
    styles.widths[size] ?? styles.widths.L,
    styles.heights[thickness] ?? styles.heights.thick,
    className,
  );

  return (
    <button {...props} type={type} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
}
