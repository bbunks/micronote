import Select, { ActionMeta, MultiValue, PropsValue } from "react-select";
import { SelectTagChip, TagProp } from "./TagChip";
import { useTags } from "../../stores/TagsStore";

interface SelectProps {
  className?: string;
  onChange: (
    newValue: MultiValue<TagProp>,
    actionMeta: ActionMeta<TagProp>
  ) => void;
  value: PropsValue<TagProp>;
  name: string;
}

export const TagMultiSelect = ({
  className,
  onChange,
  value,
  name,
}: SelectProps) => {
  const tags = useTags();

  return (
    <div className="border-b-2 border-b-neutral-900 flex flex-col gap-[4px]">
      <p className="text-neutral-900">Tags</p>
      <Select
        value={value}
        onChange={onChange}
        isMulti
        placeholder="Search"
        name={name}
        options={tags}
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
};
