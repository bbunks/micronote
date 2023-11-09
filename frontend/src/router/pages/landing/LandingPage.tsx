import { useEffect } from "react";
import {
  resetHeader,
  setCentralElement,
} from "../../../stores/HeaderSettingsStore";
import { Link } from "@tanstack/react-router";

export function LandingPage() {
  useEffect(() => {
    setCentralElement(
      <div className="text-neutral-100 text-[24px] flex justify-end grow">
        <Link
          to="/"
          className="border-neutral-100 border-solid hover:border-b-2 "
        >
          Home
        </Link>
      </div>
    );
    return resetHeader;
  }, []);
  return <></>;
}
