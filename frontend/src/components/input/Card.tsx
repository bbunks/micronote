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
        "bg-neutral-100 rounded-[24px] overflow-clip border-solid border-primary border-4 box-content " +
        className
      }
      {...rest}
    >
      <div className="p-4 flex flex-col gap-4  ">{children}</div>
    </div>
  );
}
