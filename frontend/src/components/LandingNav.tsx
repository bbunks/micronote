import { Link } from "@tanstack/react-router";

const LinkStyle =
  "border-b-2 border-transparent hover:border-neutral-100 box-border transition-all";

export function LandingNav() {
  return (
    <div className="text-neutral-100 text-[18px] flex gap-4 justify-end grow">
      <Link
        to="/"
        className={LinkStyle}
        activeProps={{
          style: {
            borderBottomColor: "var(--neutral-100)",
          },
        }}
        activeOptions={{
          exact: true,
        }}
      >
        Home
      </Link>
      <Link
        to="/about"
        className={LinkStyle}
        activeProps={{
          style: {
            borderBottomColor: "var(--neutral-100)",
          },
        }}
        activeOptions={{
          exact: true,
        }}
      >
        About
      </Link>
    </div>
  );
}
