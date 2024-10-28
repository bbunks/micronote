import { Controller, useForm } from "react-hook-form";
import { Modal } from "../../../../components/hoc/Modal";
import { TextInput } from "../../../../components/input/TextInput";
import { ChromePicker } from "react-color";
import { Button } from "../../../../components/input/Button";

export interface TagInputs {
  name: string;
  color: string;
}

interface NewTagProps {
  onSubmit: (data: TagInputs) => void;
  closeModal: () => void;
  label: string;
}

export function NewTag({ onSubmit, closeModal, label }: NewTagProps) {
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
          <Button
            variant="Neutral"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            Cancel
          </Button>
          <Button>Add</Button>
        </div>
        <p>{errors.root?.message}</p>
      </form>
    </Modal>
  );
}
