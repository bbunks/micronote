import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useWatcherState } from "react-state-extended";
import { queryWatcher } from "../../../stores/NoteStore";
import ReactSelect, { MultiValueGenericProps } from "react-select";
import { useTags } from "../../../stores/TagsStore";
// import { useState } from "react";
// import { arrayIfTrue } from "../../../utils/Array";
import {
  SearchObject,
  SearchOption,
  mapSearchObjects,
  mapToSearchObject,
} from "../../../utils/SearchQS";

type Option = {
  label: string;
  options: SearchOption[];
};

export function Search() {
  const [query] = useWatcherState(queryWatcher);
  // const [inputString, setInputString] = useState("");
  const { state, isLoading } = useTags();

  if (isLoading) return <></>;

  const options: Option[] = [
    {
      label: "Tags",
      options: state.map((ele) => ({
        type: "tag",
        label: ele.label,
        value: ele.id,
        color: ele.color,
      })),
    },
    {
      label: "Content Type",
      options: ["Picture", "Text"].map((ele) => ({
        type: "content",
        label: ele,
        value: ele.toUpperCase(),
      })),
    },
    // ...arrayIfTrue<Option>(
    //   {
    //     label: "Text",
    //     options: [
    //       {
    //         type: "contains",
    //         label: inputString,
    //         value: inputString,
    //       },
    //     ],
    //   },
    //   inputString.length > 0
    // ),
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
          defaultValue={mapSearchObjects(query, state)}
          onChange={(v) => {
            queryWatcher.value = v.map(mapToSearchObject) as SearchObject[];
          }}
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
              "bg-neutral-100 left-0 !top-[calc(100%+12px)] rounded-[24px] p-3 border-primary border-solid border-4",
            option: () => "hover:bg-gray-500 hover:bg-opacity-10 p-3",
            placeholder: () => "text-neutral-500",
            multiValueRemove: () => "!m-0 !p-0",
          }}
          menuPosition="absolute"
          components={{
            DropdownIndicator: () => null,
            MultiValueContainer: SelectTagChip,
          }}
          // onInputChange={setInputString}
        />
      </div>
    </div>
  );
}

function SelectTagChip({
  children,
  ...props
}: MultiValueGenericProps<SearchOption>) {
  return (
    <div className="bg-neutral-300 rounded-full pr-2 pl-1 flex items-center gap-1">
      {props.data.type == "tag" && (
        <>
          <div
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: props.data.color,
            }}
          />
          <p className="text-neutral-800 text-xs">tag: </p>
        </>
      )}
      {props.data.type == "content" && (
        <p className="pl-1 text-neutral-800 text-xs">content: </p>
      )}
      {props.data.type == "contains" && (
        <p className="pl-1 text-neutral-800 text-xs">contains: </p>
      )}
      {children}
    </div>
  );
}
