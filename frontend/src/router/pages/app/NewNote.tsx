import { createPortal } from "react-dom";
import { Card } from "../../../components/input/Card";
import { useEffect, useRef } from "react";
import { TextInput } from "../../../components/input/TextInput";
import { TagMultiSelect } from "../../../components/input/TagMultiSelect";
import { Button } from "../../../components/input/Button";

interface Props {
  closeModal: () => void;
}

export function NewNote({ closeModal }: Props) {
  const portalContainer = useRef<HTMLDivElement>();
  useEffect(() => {
    portalContainer.current = document.createElement("div");
    document.body.appendChild(portalContainer.current);

    return () => {
      if (portalContainer.current)
        document.body.removeChild(portalContainer.current);
    };
  }, []);
  return (
    <>
      {createPortal(
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black z-10 bg-opacity-25 flex flex-col justify-center items-stretch">
          <Card className="max-w-[600px]">
            <h1 className="text-xl">Add a note</h1>
            <TextInput inputLabel="Title" />
            <TextInput inputLabel="Content" lineCount={2} />
            <TagMultiSelect inputLabel="Tags" />
            <div className="flex justify-end gap-2">
              <Button variant="Neutral" onClick={closeModal}>
                Cancel
              </Button>
              <Button>Add</Button>
            </div>
          </Card>
        </div>,
        document.body
      )}
    </>
  );
}
