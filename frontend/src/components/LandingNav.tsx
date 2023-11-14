import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./input/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LinkStyle =
  "border-b-2 border-transparent hover:border-neutral-100 box-border transition-all";

export function LandingNav() {
  const navigate = useNavigate();
  return (
    <>
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

      <Button
        variant="PrimaryInverse"
        onClick={() => navigate({ to: "/login" })}
      >
        Login <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </>
  );
}
