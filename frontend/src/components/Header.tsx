import { Link } from "@tanstack/react-router";
import { useHeaderHook } from "../stores/HeaderSettingsStore";
import { Logo } from "./Logo";
import { ProfileDropDown } from "./ProfileDropDown";

export function Header() {
  const currentSettings = useHeaderHook();

  return (
    <>
      <div className="px-5 gap-4 flex flex-row items-center h-header-height center-or-space fixed top-0 left-0 right-0 bg-primary z-10">
        {currentSettings.showLogo && (
          <Link to="/app">
            <Logo />
          </Link>
        )}
        {currentSettings.centralElement && currentSettings.centralElement}
        {currentSettings.showProfile && <ProfileDropDown />}
      </div>
      <div className="h-header-height w-full" />
    </>
  );
}
