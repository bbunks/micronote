import { useEffect } from "react";
import {
  resetHeader,
  setCentralElement,
  showProfile,
} from "../../../stores/HeaderSettingsStore";
import { LandingNav } from "../../../components/LandingNav";
import { Button } from "../../../components/input/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@tanstack/react-router";

export function LandingPage() {
  useEffect(() => {
    setCentralElement(<LandingNav />);
    showProfile(false);

    return resetHeader;
  }, []);
  return (
    <div className="h-[720px] w-full relative pt-[120px]">
      <div className="text-neutral-100 flex flex-col items-center gap-6">
        <h1 className="sm:text-6xl text-2xl">All your thoughts in one place</h1>
        <h1 className="sm:text-3xl text-xl">Easy to add, Easy to find</h1>
        <Link to="/login">
          <Button variant="PrimaryInverse">
            Find your notes{" "}
            <FontAwesomeIcon className="ml-4" icon={faArrowRight} />
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <img className="w-full max-h-[400px]" src="/Stacks.svg" />
      </div>
    </div>
  );
}
