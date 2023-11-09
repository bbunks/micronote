import { PropsWithChildren } from "react";

interface Props {
  variant?: Variations;
}

export function Button({
  children,
  variant,
  className,
  ...props
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & Props>) {
  let style = variants[variant ?? "Primary"];
  return (
    <button
      className={"px-6 py-3 rounded-full " + style + " " + className}
      {...props}
    >
      {children}
    </button>
  );
}

type Variations = "Primary" | "PrimaryInverse" | "Neutral" | "NeutralInverse";

const variants = {
  Primary:
    "bg-primary text-neutral-100 hover:bg-primary-dark hover:text-neutral-200 active:bg-primary-darker active:text-neutral-300",
  PrimaryInverse:
    "bg-neutral-100 text-primary hover:bg-neutral-200 hover:text-primary-dark active:bg-neutral-300 active:text-primary-darker",
  Neutral:
    "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 hover:text-neutral-700 active:bg-neutral active:text-neutral-800",
  NeutralInverse:
    "bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-100 active:bg-neutral-700 active:text-neutral-200",
};
