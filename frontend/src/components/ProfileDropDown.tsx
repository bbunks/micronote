import {
  faChevronDown,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { useNavigate } from "@tanstack/react-router";

export function ProfileDropDown() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Menu>
        <Menu.Button
          className={
            "px-4 py-3 rounded-full bg-neutral-100 text-primary hover:bg-neutral-200 hover:text-primary-dark active:bg-neutral-300 active:text-primary-darker flex gap-2 items-center"
          }
        >
          <FontAwesomeIcon icon={faUser} />{" "}
          <FontAwesomeIcon icon={faChevronDown} />
        </Menu.Button>
        <Menu.Items className="absolute top-full flex flex-col items-stretch right-0 bg-neutral-100 p-4 mt-4 rounded-[24px] gap-2 border-2 border-solid border-primary">
          {/* Settings */}
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active && "bg-neutral-300"
                } py-2 px-4 rounded-[24px] flex items-center justify-between`}
                onClick={() => navigate({ to: "/report" })}
              >
                <p className="w-max">Report</p>
              </div>
            )}
          </Menu.Item>

          {/* Sign Out */}
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active && "bg-neutral-300"
                } py-2 px-4 rounded-[24px] flex items-center justify-start gap-4 text-error`}
                onClick={() => navigate({ to: "/logout" })}
              >
                <p className="w-max">Sign out</p>
                <FontAwesomeIcon icon={faSignOut} />
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
