import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "light",
  className = "",
  priority = false,
}: LogoProps) {
  const src = variant === "light" ? "/logo.svg" : "/logo-dark.svg";
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
      aria-label="VIixson Autos home"
    >
      <Image
        src={src}
        alt="VIixson Autos"
        width={160}
        height={36}
        className="h-7 w-auto md:h-9"
        priority={priority}
      />
    </Link>
  );
}
