import { PropsWithChildren, ReactElement } from "react";

interface Props {
  inputLabel?: ReactElement | string;
  inputClassName?: string;
  lineCount?: number;
}

export function TextInput({
  name,
  inputLabel,
  lineCount,
  className,
  inputClassName,
  ...props
}: PropsWithChildren<
  React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> & Props
>) {
  return (
    <div
      className={
        "border-b-2 border-b-neutral-900 flex flex-col gap-[4px] " + className
      }
    >
      {inputLabel && (
        <label htmlFor={name} className="text-neutral-900">
          {inputLabel}
        </label>
      )}
      {(lineCount ?? 1) <= 1 ? (
        <input
          {...props}
          id={name}
          name={name}
          className={
            "text-neutral-900 py-2 bg-transparent outline-none p-transition hover:bg-gray-500 hover:bg-opacity-10 focus:px-2 focus:bg-gray-500 focus:bg-opacity-5 " +
            inputClassName
          }
        />
      ) : (
        <textarea
          {...props}
          id={name}
          name={name}
          rows={lineCount}
          className={
            "text-neutral-900 py-2 bg-transparent outline-none p-transition hover:bg-gray-500 hover:bg-opacity-10 focus:px-2 focus:bg-gray-500 focus:bg-opacity-5 resize-none " +
            inputClassName
          }
        />
      )}
    </div>
  );
}
