import Select from "react-select";
import { TagChip } from "./TagChip";
import { useTags } from "../../../stores/TagsStore";

interface Props {
  inputLabel?: string;
  className?: string;
}

export function MultiSelect({ inputLabel, className }: Props) {
  const tags = useTags();

  return (
    <div className="border-b-2 border-b-neutral-900 flex flex-col gap-[4px]">
      {inputLabel && <p className="text-neutral-900">{inputLabel}</p>}
      <Select
        isMulti
        placeholder=""
        name={inputLabel}
        options={tags.map((ele) => ({
          label: ele.label,
          value: ele.id,
          color: ele.color,
        }))}
        unstyled
        classNames={{
          container: (state) =>
            "text-neutral-900 outline-none " +
            (state.isFocused
              ? "bg-gray-500 bg-opacity-5"
              : "hover:bg-gray-500 hover:bg-opacity-10") +
            " " +
            className,
          valueContainer: () => "gap-1",
          clearIndicator: () =>
            "hover:bg-gray-500 hover:bg-opacity-20 rounded-full mr-1 text-neutral-800",
          indicatorsContainer: () => "text-neutral-800",
          control: () => "!min-h-0 p-3",
          menu: () => "bg-neutral-100",
          option: () => "hover:bg-gray-500 hover:bg-opacity-10 p-3",
        }}
        components={{
          MultiValueContainer: TagChip,
        }}
      />
    </div>
  );
}
