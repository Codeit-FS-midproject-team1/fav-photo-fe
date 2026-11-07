import * as styles from "./Button.css.js";
import clsx from "clsx";
import Link from "next/link";

const variantStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
};

/**
 * @typedef {import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
 *   href?: string;
 *   variant?: "primary" | "secondary" | "ghost";
 *   size?: "responsive" | "XS" | "fit";
 *   thickness?: "thick" | "thin" | "auto";
 * }} ButtonProps
 */

/** @param {ButtonProps} props */

export default function Button({
  children,
  href,
  variant = "primary",
  size = "responsive",
  thickness = "thick",
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  const classNames = clsx(
    styles.button,
    variantStyles[variant] ?? variantStyles.primary,
    styles.widths[size] ?? styles.widths.responsive,
    styles.heights[thickness] ?? styles.heights.thick,
    className,
  );

  if (href) {
    return (
      <Link {...props} href={href} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} type={type} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
}
