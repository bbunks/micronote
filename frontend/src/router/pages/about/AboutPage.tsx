import { useEffect } from "react";
import {
  resetHeader,
  setCentralElement,
} from "../../../stores/HeaderSettingsStore";
import { LandingNav } from "../../../components/LandingNav";

export function AboutPage() {
  useEffect(() => {
    setCentralElement(<LandingNav />);
    return resetHeader;
  }, []);
  return <></>;
}
