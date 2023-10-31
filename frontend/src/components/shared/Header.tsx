import { useHeaderHook } from "../../stores/HeaderSettingsStore";
import { Logo } from "./Logo";
import { Button } from "./input/Button";
import { Search } from "./input/Search";

export function Header() {
  const currentSettings = useHeaderHook();

  return (
    <>
      <div className="p-6 flex flex-row items-center h-header-height center-or-space fixed top-0 left-0 right-0 bg-primary">
        {currentSettings.showLogo && <Logo />}
        {currentSettings.centralElement && currentSettings.centralElement}
        <Search />
        <Button variant="PrimaryInverse">Profile</Button>
      </div>
      <div className="h-header-height w-full" />
    </>
  );
}
