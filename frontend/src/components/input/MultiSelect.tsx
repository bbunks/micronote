import Select, { GroupBase } from "react-select";
// import CreatableSelect from "react-select/creatable";
import { Props } from "react-select/base";

interface SelectProps<T> extends Props<T, true, GroupBase<T>> {
  containerClassNames?: string;
  label?: React.ReactNode;
}

export function MultiSelect<T>({
  classNames,
  containerClassNames,
  label,
  unstyled = false,
  ...rest
}: Partial<SelectProps<T>>) {
  return (
    <div className="border-b-2 border-b-neutral-900 flex flex-col gap-[4px]">
      {label && <p className="text-neutral-900">{label}</p>}
      <Select
        isMulti
        unstyled
        classNames={{
          container: (state) =>
            "text-neutral-900 outline-none " +
            (state.isFocused
              ? "bg-gray-500 bg-opacity-5"
              : "hover:bg-gray-500 hover:bg-opacity-10 ") +
            " " +
            containerClassNames,
          valueContainer: () => "gap-1",
          clearIndicator: () =>
            "hover:bg-gray-500 hover:bg-opacity-20 rounded-full mr-1 text-neutral-800",
          indicatorsContainer: () => "text-neutral-800",
          control: (state) =>
            "!min-h-0 py-2 p-transition " + (state.isFocused ? "pl-2" : ""),
          menu: () => "bg-neutral-100",
          option: () => "hover:bg-gray-500 hover:bg-opacity-10 p-3",
          placeholder: () => "text-neutral-500",
          ...classNames,
        }}
        {...rest}
      />
    </div>
  );
}

// Not used but may be used in the future. Commented out for tree shaking...

// export function CreateableMultiSelect<T>({
//   classNames,
//   containerClassNames,
//   label,
//   unstyled = false,
//   ...rest
// }: Partial<SelectProps<T>>) {
//   return (
//     <div className="border-b-2 border-b-neutral-900 flex flex-col gap-[4px]">
//       {label && <p className="text-neutral-900">{label}</p>}
//       <CreatableSelect
//         isMulti
//         unstyled
//         classNames={{
//           container: (state) =>
//             "text-neutral-900 outline-none " +
//             (state.isFocused
//               ? "bg-gray-500 bg-opacity-5"
//               : "hover:bg-gray-500 hover:bg-opacity-10 ") +
//             " " +
//             containerClassNames,
//           valueContainer: () => "gap-1",
//           clearIndicator: () =>
//             "hover:bg-gray-500 hover:bg-opacity-20 rounded-full mr-1 text-neutral-800",
//           indicatorsContainer: () => "text-neutral-800",
//           control: (state) =>
//             "!min-h-0 py-2 p-transition " + (state.isFocused ? "pl-2" : ""),
//           menu: () => "bg-neutral-100",
//           option: () => "hover:bg-gray-500 hover:bg-opacity-10 p-3",
//           placeholder: () => "text-neutral-500",
//           ...classNames,
//         }}
//         {...rest}
//       />
//     </div>
//   );
// }
