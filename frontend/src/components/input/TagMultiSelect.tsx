import {
  ActionMeta,
  MultiValue,
  OptionProps,
  PropsValue,
  components,
} from "react-select";
import { SelectTagChip, TagProp } from "./TagChip";
import { useTags } from "../../stores/TagsStore";
import { arrayIfTrue } from "../../utils/Array";
import { useState } from "react";
import { MultiSelect } from "./MultiSelect";

interface SelectProps {
  className?: string;
  onChange: (
    newValue: MultiValue<TagProp>,
    actionMeta: ActionMeta<TagProp>
  ) => void;
  value: PropsValue<TagProp>;
  name: string;
}

export const TagMultiSelect = ({ onChange, value, name }: SelectProps) => {
  const { state } = useTags();
  const [inputString, setInputString] = useState("");

  const options = [
    ...state.map((ele) => ({ ...ele, value: ele.id })),
    ...arrayIfTrue(
      {
        label: inputString,
        value: inputString.toLowerCase(),
        new: true,
      },
      inputString.length > 0 &&
        !state
          .map((ele) => ele.label.toLowerCase())
          .includes(inputString.toLowerCase())
    ),
  ];

  function handleChange(
    newValue: MultiValue<TagProp>,
    actionMeta: ActionMeta<TagProp>
  ) {
    onChange(newValue, actionMeta);
  }

  return (
    <MultiSelect
      value={value}
      onChange={handleChange}
      placeholder="Search"
      label="Tags"
      menuPosition="fixed"
      name={name}
      options={options}
      components={{
        MultiValueContainer: SelectTagChip,
        Option: Option,
      }}
      onInputChange={setInputString}
    />
  );
};

function Option(props: OptionProps<TagProp>) {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        {props.data.new ? (
          <p>Create tag "{props.children}"</p>
        ) : (
          <>
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: props.data.color,
              }}
            />
            {props.children}
          </>
        )}
      </div>
    </components.Option>
  );
}
