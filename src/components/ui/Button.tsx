import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-dark-red border border-transparent",
  secondary:
    "bg-brand-black text-white hover:bg-brand-deep border border-transparent",
  outline:
    "bg-transparent text-brand-black border border-brand-black/20 hover:border-brand-red hover:text-brand-red",
  ghost:
    "bg-transparent text-brand-black hover:text-brand-red border border-transparent",
  white:
    "bg-white text-brand-black hover:bg-brand-light border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs tracking-wide",
  md: "h-11 px-5 text-sm tracking-wide",
  lg: "h-12 px-6 text-sm tracking-[0.12em]",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel, onClick, "aria-label": ariaLabel } =
      props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
