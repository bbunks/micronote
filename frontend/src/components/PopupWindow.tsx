import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

interface Props {}

export function PopupWindow({ children }: PropsWithChildren<Props>) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-10 h-16 w-16 rounded-full bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-100 active:bg-neutral-700 active:text-neutral-200"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
      <div
        className={
          "fixed z-20 rounded-full transition-all bottom-4 right-4" +
          " " +
          (isOpen ? "" : "hidden")
        }
      >
        {children}
      </div>
    </>
  );
}
