import { MouseEvent, useState } from "react";
import { TextInput } from "../../../../components/input/TextInput";
import { TagMultiSelect } from "../../../../components/input/TagMultiSelect";
import { Button } from "../../../../components/input/Button";
import { Modal } from "../../../../components/hoc/Modal";
import { useForm, Controller } from "react-hook-form";
import { Note } from "../../../../types/Note";
import { arrayIfTrue } from "../../../../utils/Array";
import { Content, ContentType } from "../../../../types/Content";
import AuthService from "../../../../services/AuthService";
import { updateNotes } from "../../../../stores/NoteStore";
import { Tag } from "../../../../types/Tag";
import { updateTags } from "../../../../stores/TagsStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NewTag, TagInputs } from "./NewTag";

interface Props {
  closeModal: () => void;
  defaultNoteData: Note | null;
}

interface Inputs {
  title: string;
  content: string;
  tags: Tag[];
}

export function NewNote({ closeModal, defaultNoteData }: Props) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [newTagOpen, setNewTagOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const { register, handleSubmit, control, formState, getValues, setValue } =
    useForm<Inputs>({
      mode: "onChange",
      defaultValues: {
        title: defaultNoteData?.title ?? "",
        content:
          defaultNoteData?.contents.find((ele) => ele.type === ContentType.TEXT)
            ?.value ?? "",
        tags: defaultNoteData?.tags ?? [],
      },
    });

  const { errors, isDirty } = formState;

  function onSubmit(data: Inputs) {
    const newNote: Partial<Note> = {
      id: defaultNoteData?.id,
      title: data.title,
      contents: [
        ...arrayIfTrue<Content>(
          {
            id: defaultNoteData?.contents.find(
              (ele) => ele.type === ContentType.TEXT
            )?.id,
            type: ContentType.TEXT,
            value: data.content,
          },
          data.content.length > 0
        ),
      ],
      tags: data.tags,
    };

    AuthService.makeAuthorizedRequest("/api/note", {
      body: JSON.stringify(newNote),
      method: defaultNoteData?.id ? "PUT" : "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        updateNotes(true);
        updateTags(true);
        closeModal();
      }
    });
  }

  function confirmClose(e?: MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    if (isDirty) setConfirmationOpen(true);
    else closeModal();
  }

  function createTag(data: TagInputs) {
    setValue("tags", [
      ...getValues("tags").filter((ele) => ele.label !== data.name),
      { label: data.name, color: data.color },
    ]);
    setNewTagOpen(false);
    setNewTagName("");
  }

  return (
    <>
      <h1 className="text-xl">Add a note</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          inputLabel="Title"
          error={errors.title?.type}
          {...register("title", { required: true })}
        />
        <TextInput
          inputLabel="Content"
          lineCount={2}
          {...register("content")}
        />
        <div className="flex items-end gap-4">
          <Controller
            control={control}
            defaultValue={[]}
            name="tags"
            render={({ field }) => {
              return (
                <TagMultiSelect
                  name={field.name}
                  onChange={(data, meta) => {
                    if (meta.action === "select-option" && meta.option?.new) {
                      setNewTagName(meta.option.label ?? "");
                      setNewTagOpen(true);
                    } else field.onChange(data, meta);
                  }}
                  value={field.value}
                />
              );
            }}
          />
          <Button
            className="flex !p-3 relative"
            variant="Neutral"
            onClick={(e) => {
              e.preventDefault();
              setNewTagName("");
              setNewTagOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="Neutral" onClick={confirmClose}>
            Cancel
          </Button>
          <Button>{defaultNoteData ? "Save" : "Add"}</Button>
        </div>
        <p>{errors.root?.message}</p>
      </form>
      {confirmationOpen && (
        <Modal
          onBgClick={() => setConfirmationOpen(false)}
          style={{ maxWidth: "500px" }}
        >
          <p>
            {defaultNoteData
              ? "Are you sure you would like to close this? This will discard all edits you have made to the note."
              : "Are you sure you would like to close this? This will delete the note."}
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="Neutral"
              onClick={() => setConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={closeModal}>
              {defaultNoteData ? "Discard" : "Delete"}
            </Button>
          </div>
        </Modal>
      )}
      {newTagOpen && (
        <NewTag
          onSubmit={createTag}
          closeModal={() => setNewTagOpen(false)}
          label={newTagName}
        />
      )}
    </>
  );
}
