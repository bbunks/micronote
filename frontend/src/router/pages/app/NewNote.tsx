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
import { updateTags } from "../../../stores/TagsStore";
import { ChromePicker } from "react-color";
import { FileInput } from "../../../components/input/FileInput";

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
  const [newTagOpen, setNewTagOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
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

    AuthService.makeAuthorizedRequest("/api/note", {
      body: JSON.stringify(newNote),
      method: "POST",
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
    setConfirmationOpen(true);
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
      <DevTool control={control} />
      <Modal onBgClick={confirmClose}>
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
          <FileInput />
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

          <div className="flex justify-end gap-2">
            <Button variant="Neutral" onClick={confirmClose}>
              Cancel
            </Button>
            <Button>Add</Button>
          </div>
          <p>{errors.root?.message}</p>
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
      {newTagOpen && (
        <NewTag
          onSubmit={createTag}
          closeModal={() => setConfirmationOpen(false)}
          label={newTagName}
        />
      )}
    </>
  );
}

interface TagInputs {
  name: string;
  color: string;
}

interface NewTagProps {
  onSubmit: (data: TagInputs) => void;
  closeModal: () => void;
  label: string;
}

function NewTag({ onSubmit, closeModal, label }: NewTagProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TagInputs>({
    mode: "onChange",
  });

  return (
    <Modal onBgClick={closeModal} style={{ maxWidth: "500px" }}>
      <h1 className="text-xl">Add a tag</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          inputLabel="Name"
          defaultValue={label}
          error={errors.name?.type}
          {...register("name", { required: true })}
        />
        <Controller
          control={control}
          defaultValue={"#ffffff"}
          name="color"
          render={({ field }) => (
            <ChromePicker
              color={field.value}
              onChange={(a, b) => field.onChange(a.hex, b)}
              disableAlpha
            />
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="Neutral" onClick={closeModal}>
            Cancel
          </Button>
          <Button>Add</Button>
        </div>
        <p>{errors.root?.message}</p>
      </form>
    </Modal>
  );
}
