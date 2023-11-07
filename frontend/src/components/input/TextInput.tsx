import { PropsWithChildren, ReactElement } from "react";

interface Props {
  inputLabel?: ReactElement | string;
  lineCount?: number;
}

export function TextInput({
  name,
  inputLabel,
  lineCount,
}: PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement> & Props>) {
  return (
    <div className="border-b-2 border-b-neutral-900 flex flex-col gap-[4px]">
      {inputLabel && (
        <label htmlFor={name} className="text-neutral-900">
          {inputLabel}
        </label>
      )}
      {(lineCount ?? 1) <= 1 ? (
        <input
          id={name}
          name={name}
          className="text-neutral-900 p-3 bg-transparent outline-none hover:bg-gray-500 hover:bg-opacity-10 focus:bg-gray-500 focus:bg-opacity-5"
        />
      ) : (
        <textarea
          id={name}
          name={name}
          rows={lineCount}
          className="text-neutral-900 p-3 bg-transparent outline-none hover:bg-gray-500 hover:bg-opacity-10 focus:bg-gray-500 focus:bg-opacity-5 resize-none"
        />
      )}
    </div>
  );
}
