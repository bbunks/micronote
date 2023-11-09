import { useState } from "react";
import { TextInput } from "../../../components/input/TextInput";
import { TagMultiSelect } from "../../../components/input/TagMultiSelect";
import { Button } from "../../../components/input/Button";
import { Modal } from "../../../components/hoc/Modal";

interface Props {
  closeModal: () => void;
}

export function NewNote({ closeModal }: Props) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  function confirmClose() {
    setConfirmationOpen(true);
  }
  return (
    <>
      <Modal onBgClick={confirmClose}>
        <h1 className="text-xl">Add a note</h1>
        <TextInput inputLabel="Title" />
        <TextInput inputLabel="Content" lineCount={2} />
        <TagMultiSelect inputLabel="Tags" />
        <div className="flex justify-end gap-2">
          <Button variant="Neutral" onClick={confirmClose}>
            Cancel
          </Button>
          <Button>Add</Button>
        </div>
      </Modal>
      {confirmationOpen && (
        <Modal
          onBgClick={() => setConfirmationOpen(false)}
          style={{ maxWidth: "500px" }}
        >
          <p>
            Are you sure you would like to close this prompt? This will delete
            all the notes contents.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="Neutral"
              onClick={() => setConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={closeModal}>Delete</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
