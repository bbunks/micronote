import { useHeaderHook } from "../stores/HeaderSettingsStore";
import { Logo } from "./Logo";
import { Button } from "./input/Button";

export function Header() {
  const currentSettings = useHeaderHook();

  return (
    <>
      <div className="p-6 flex flex-row items-center h-header-height center-or-space fixed top-0 left-0 right-0 bg-primary z-10">
        {currentSettings.showLogo && <Logo />}
        {currentSettings.centralElement && currentSettings.centralElement}
        <Button
          variant="PrimaryInverse"
          onClick={() => {
            const headers = new Headers();
            headers.set(
              "Authorization",
              "Basic " + btoa("brenden" + ":" + "test123")
            );

            fetch("/api", {
              headers,
            })
              .then((res) => res.json())
              .then((res) => console.log(res));
          }}
        >
          Profile
        </Button>
      </div>
      <div className="h-header-height w-full" />
    </>
  );
}
