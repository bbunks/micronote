import { MouseEvent, useState } from "react";
import { TextInput } from "../../../components/input/TextInput";
import { TagMultiSelect } from "../../../components/input/TagMultiSelect";
import { Button } from "../../../components/input/Button";
import { Modal } from "../../../components/hoc/Modal";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  closeModal: () => void;
}

interface Inputs {
  title: string;
  content: string;
}

export function NewNote({ closeModal }: Props) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  function confirmClose(e?: MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    setConfirmationOpen(true);
  }

  return (
    <>
      <Modal onBgClick={confirmClose}>
        <h1 className="text-xl">Add a note</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput inputLabel="Title" {...register("title")} />
          <TextInput
            inputLabel="Content"
            lineCount={2}
            {...register("content")}
          />
          <TagMultiSelect inputLabel="Tags" />
          <div className="flex justify-end gap-2">
            <Button variant="Neutral" onClick={confirmClose}>
              Cancel
            </Button>
            <Button>Add</Button>
          </div>
        </form>
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
