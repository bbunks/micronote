import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useWatcherState } from "react-state-extended";
import { queryWatcher } from "../../../stores/NoteStore";
import ReactSelect from "react-select";
import { useTags } from "../../../stores/TagsStore";
import { useState } from "react";
import { arrayIfTrue } from "../../../utils/Array";

export function Search() {
  const [query] = useWatcherState(queryWatcher);
  const [inputString, setInputString] = useState("");
  const tags = useTags();

  const options = [
    {
      label: "Tags",
      options: tags.map((ele) => ({
        label: ele.label,
        value: ele.id,
        color: ele.color,
      })),
    },
    {
      label: "Attachment Type",
      options: ["Picture"].map((ele) => ({
        label: ele,
        value: ele.toLowerCase(),
      })),
    },
    ...arrayIfTrue(
      {
        label: "Text",
        options: [
          {
            label: 'Contains "' + inputString + '"',
          },
        ],
      },
      inputString.length > 0
    ),
  ];

  return (
    <div className="relative flex flex-col items-stretch bg-neutral-100 px-4 py-3 rounded-full gap-3 flex-grow max-w-[800px] mx-[72px]">
      <div className="flex flex-row items-center gap-3">
        <FontAwesomeIcon
          className="text-neutral-900"
          icon={faMagnifyingGlass}
        />
        <ReactSelect
          isMulti
          placeholder="Search"
          options={options}
          unstyled
          classNames={{
            container: () =>
              "bg-transparent outline-none text-neutral-900 flex-grow !static",
            valueContainer: () => "gap-1",
            clearIndicator: () =>
              "hover:bg-gray-500 hover:bg-opacity-20 rounded-full mr-1 text-neutral-800",
            indicatorsContainer: () => "text-neutral-800",
            control: () => "!min-h-0",
            menu: () =>
              "bg-neutral-100 left-0 !top-[calc(100%+12px)] rounded-[24px] p-3 border-neutral-300 border-solid border",
            option: () => "hover:bg-gray-500 hover:bg-opacity-10 p-3",
            placeholder: () => "text-neutral-500",
          }}
          menuPosition="absolute"
          components={{
            DropdownIndicator: () => null,
          }}
          onInputChange={setInputString}
        />
      </div>
    </div>
  );
}
