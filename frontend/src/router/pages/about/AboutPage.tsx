import { useEffect } from "react";
import {
  resetHeader,
  setCentralElement,
  showProfile,
} from "../../../stores/HeaderSettingsStore";
import { LandingNav } from "../../../components/LandingNav";

export function AboutPage() {
  useEffect(() => {
    setCentralElement(<LandingNav />);
    showProfile(false);

    return resetHeader;
  }, []);
  return <></>;
}
