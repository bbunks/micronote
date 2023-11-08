import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export function Card({ children, className }: PropsWithChildren<Props>) {
  return (
    <div
      className={
        "bg-neutral-100 rounded-[24px] p-4 flex flex-col gap-4 overflow-clip border-solid border-primary border-2 " +
        className
      }
    >
      {children}
    </div>
  );
}
