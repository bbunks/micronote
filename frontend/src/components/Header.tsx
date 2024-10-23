import { Link } from "@tanstack/react-router";
import { useHeaderHook } from "../stores/HeaderSettingsStore";
import { Logo } from "./Logo";
import { ProfileDropDown } from "./ProfileDropDown";
import { useEffect, useState } from "react";
import { Button } from "./input/Button";
import { useMobile } from "../hooks/useMobile";
import { router } from "../router/Router";
import { useMeasure } from "@uidotdev/usehooks";

export function Header() {
  const currentSettings = useHeaderHook();
  const [showCenter, setShowCenter] = useState(false);
  const isMobile = useMobile(() => setShowCenter(false));
  const [ref, { height }] = useMeasure();

  useEffect(
    () =>
      router.subscribe("onBeforeLoad", (change) => {
        if (change.pathChanged) setShowCenter(false);
      }),
    []
  );

  return (
    <>
      <div className="flex flex-col fixed top-0 left-0 right-0 z-10">
        <div className="px-5 gap-4 flex flex-row items-center h-header-height center-or-space bg-primary relative">
          {currentSettings.showLogo && (
            <Link to="/app">
              <Logo />
            </Link>
          )}
          {currentSettings.centralElement && (
            <>
              {!isMobile && currentSettings.centralElement}
              <div className="flex gap-2">
                {isMobile && (
                  <Button
                    className="self-start flex !p-3 relative"
                    onClick={() => {
                      setShowCenter((p) => {
                        if (!p) {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        return !p;
                      });
                    }}
                  >
                    {currentSettings.navToggleElement}
                  </Button>
                )}
                {currentSettings.showProfile && <ProfileDropDown />}
              </div>
              {isMobile && showCenter && (
                <div
                  className="px-5 pb-5 absolute bg-primary left-0 right-0 top-full"
                  ref={ref}
                >
                  {currentSettings.centralElement}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="h-header-height w-full" />
      {isMobile && showCenter && (
        <div
          className="w-full"
          style={{
            height: height ?? 0,
          }}
        />
      )}
    </>
  );
}
