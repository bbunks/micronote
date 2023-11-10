import { MouseEvent, useState } from "react";
import { TextInput } from "../../../components/input/TextInput";
import { TagMultiSelect } from "../../../components/input/TagMultiSelect";
import { Button } from "../../../components/input/Button";
import { Modal } from "../../../components/hoc/Modal";
import { useForm, Controller } from "react-hook-form";
import { Note } from "../../../types/Note";
import { arrayIfTrue } from "../../../utils/Array";
import { Content, ContentType } from "../../../types/Content";
import AuthService from "../../../services/AuthService";
import { updateNotes } from "../../../stores/NoteStore";
import { DevTool } from "@hookform/devtools";
import { Tag } from "../../../types/Tag";

interface Props {
  closeModal: () => void;
}

interface Inputs {
  title: string;
  content: string;
  tags: Tag[];
}

export function NewNote({ closeModal }: Props) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  function onSubmit(data: Inputs) {
    const newNote: Partial<Note> = {
      title: data.title,
      contents: [
        ...arrayIfTrue<Content>(
          {
            type: ContentType.TEXT,
            value: data.content,
          },
          data.content.length > 0
        ),
      ],
      tags: data.tags,
    };

    console.log(newNote);

    AuthService.makeAuthorizedRequest("/api/note", {
      body: JSON.stringify(newNote),
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        updateNotes(true);
        closeModal();
      }
    });
  }

  function confirmClose(e?: MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    setConfirmationOpen(true);
  }

  return (
    <>
      <DevTool control={control} />
      <Modal onBgClick={confirmClose}>
        <h1 className="text-xl">Add a note</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput inputLabel="Title" {...register("title")} />
          <TextInput
            inputLabel="Content"
            lineCount={2}
            {...register("content")}
          />
          <Controller
            control={control}
            defaultValue={[]}
            name="tags"
            render={({ field }) => (
              <TagMultiSelect
                name={field.name}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

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
