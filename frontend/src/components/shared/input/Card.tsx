import { PropsWithChildren } from "react";

interface Props {
  classNames?: string;
}

export function Card({ children, classNames }: PropsWithChildren<Props>) {
  return (
    <div
      className={
        "bg-neutral-100 rounded-[24px] p-4 flex flex-col gap-4 " + classNames
      }
    >
      {children}
    </div>
  );
}
