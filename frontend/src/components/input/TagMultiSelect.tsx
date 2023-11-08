import Select from "react-select";
import { SelectTagChip } from "./TagChip";
import { useTags } from "../../stores/TagsStore";

interface Props {
  inputLabel?: string;
  className?: string;
}

export function TagMultiSelect({ inputLabel, className }: Props) {
  const tags = useTags();

  return (
    <div className="border-b-2 border-b-neutral-900 flex flex-col gap-[4px]">
      {inputLabel && <p className="text-neutral-900">{inputLabel}</p>}
      <Select
        isMulti
        placeholder="Search"
        name={inputLabel}
        options={tags.map((ele) => ({
          label: ele.label,
          value: ele.id,
          color: ele.color,
        }))}
        unstyled
        menuPosition="fixed"
        classNames={{
          container: (state) =>
            "text-neutral-900 outline-none " +
            (state.isFocused
              ? "bg-gray-500 bg-opacity-5"
              : "hover:bg-gray-500 hover:bg-opacity-10 ") +
            " " +
            className,
          valueContainer: () => "gap-1",
          clearIndicator: () =>
            "hover:bg-gray-500 hover:bg-opacity-20 rounded-full mr-1 text-neutral-800",
          indicatorsContainer: () => "text-neutral-800",
          control: (state) =>
            "!min-h-0 py-2 p-transition " + (state.isFocused ? "pl-2" : ""),
          menu: () => "bg-neutral-100",
          option: () => "hover:bg-gray-500 hover:bg-opacity-10 p-3",
          placeholder: () => "text-neutral-500",
        }}
        components={{
          MultiValueContainer: SelectTagChip,
        }}
      />
    </div>
  );
}
