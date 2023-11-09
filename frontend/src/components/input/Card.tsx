import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export function Card({
  children,
  className,
  ...rest
}: PropsWithChildren<Props & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={
        "bg-neutral-100 rounded-[24px] p-4 flex flex-col gap-4 overflow-clip border-solid border-primary border-2 " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}
