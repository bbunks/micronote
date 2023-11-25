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
      <div className="text-neutral-100 text-[18px] flex gap-4 justify-end grow flex-col sm:flex-row items-end mr-4 sm:mr-0">
        <div>
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
        </div>
        <div>
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
      </div>
      <Button
        variant="PrimaryInverse"
        onClick={() => navigate({ to: "/login" })}
        className="mt-4 sm:mt-0 float-right -mr-2 sm:mr-0"
      >
        Login <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </>
  );
}
