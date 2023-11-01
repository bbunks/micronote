import { PropsWithChildren, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  inputLabel?: ReactElement | string;
}

export function Search({
  name,
}: PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement> & Props>) {
  return (
    <div className="flex flex-row bg-neutral-100 px-4 py-3 rounded-full items-center gap-3 flex-grow max-w-[800px] mx-[72px]">
      <FontAwesomeIcon className="text-neutral-900" icon={faMagnifyingGlass} />
      <input
        id={name}
        name={name}
        className="bg-transparent outline-none text-neutral-900 flex-grow"
        placeholder="Search"
      />
      <button className="bg-neutral-100 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-900 active:bg-neutral active:text-neutral-800 w-[24px] h-[24px] rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
}
