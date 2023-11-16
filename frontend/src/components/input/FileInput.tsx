import {
  PropsWithChildren,
  ReactElement,
  RefObject,
  forwardRef,
  useRef,
  useState,
} from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  inputLabel?: ReactElement | string;
  inputClassName?: string;
  lineCount?: number;
  error?: string | undefined;
}

export const FileInput = forwardRef<
  HTMLInputElement,
  PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement> & Props>
>(
  (
    {
      name,
      inputLabel = "Attachments",
      lineCount,
      className,
      inputClassName,
      error,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);

    //@ts-expect-error Its a ref object
    const filesRef: RefObject<HTMLInputElement> = ref ?? innerRef;
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="flex flex-col gap-1">
        <div
          className={
            "border-b-2 border-b-neutral-900 flex flex-col " + className
          }
        >
          <div className="flex items-baseline gap-2">
            <label htmlFor={name} className="text-neutral-900">
              {inputLabel}
            </label>
            {error && <p className="text-error text-xs">{error}</p>}
          </div>
          <input
            ref={filesRef}
            {...props}
            id={"HELLO"}
            name={name}
            className="hidden"
            type="file"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files ?? []);
              setFiles((p) => {
                const newList = [
                  ...p.filter(
                    (file) =>
                      newFiles.findIndex(
                        (newFile) => file.name === newFile.name
                      ) === -1
                  ),
                  ...newFiles,
                ];

                const data = new DataTransfer();

                newList.forEach((ele) => {
                  data.items.add(ele);
                });

                if (filesRef.current) filesRef.current.files = data.files;

                return newList;
              });
            }}
            multiple
          />
          <div className="py-2 hover:bg-neutral-200 flex gap-2">
            {Array.from(files ?? []).map((ele) => {
              return (
                <div className="bg-neutral-300 rounded-full px-2 inline-flex items-center gap-1 self-start">
                  <p>{ele.name}</p>
                  <button
                    className="flex items-center"
                    onClick={(e) => {
                      e.preventDefault();

                      setFiles((p) => {
                        const newList = [
                          ...p.filter((file) => file.name !== ele.name),
                        ];

                        const data = new DataTransfer();

                        newList.forEach((ele) => {
                          data.items.add(ele);
                        });

                        if (filesRef.current)
                          filesRef.current.files = data.files;

                        return newList;
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
            <Button
              className="self-start flex !p-1"
              variant="Neutral"
              onClick={(e) => {
                e.preventDefault();
                filesRef.current?.click();
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
