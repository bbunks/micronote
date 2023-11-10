import { PropsWithChildren, ReactElement, forwardRef } from "react";

interface Props {
  inputLabel?: ReactElement | string;
  inputClassName?: string;
  lineCount?: number;
  error?: string | undefined;
}

export const TextInput = forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  PropsWithChildren<
    React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> & Props
  >
>(
  (
    { name, inputLabel, lineCount, className, inputClassName, error, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <div
          className={
            "border-b-2 border-b-neutral-900 flex flex-col gap-[1 " + className
          }
        >
          {inputLabel && (
            <label htmlFor={name} className="text-neutral-900">
              {inputLabel}
            </label>
          )}
          {(lineCount ?? 1) <= 1 ? (
            <input
              ref={ref}
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
              ref={ref}
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
        {error && <p className="text-error text-xs">{error}</p>}
      </div>
    );
  }
);
