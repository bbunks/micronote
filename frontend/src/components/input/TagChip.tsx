import { MultiValueGenericProps, components } from "react-select";

export interface TagProp {
  color?: string;
  id?: number;
  label?: string;
}

export function SelectTagChip(props: MultiValueGenericProps<TagProp>) {
  return (
    <components.MultiValueContainer {...props}>
      <div className="bg-neutral-300 rounded-full pr-2 pl-1 flex items-center gap-1">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: props.data.color,
          }}
        />
        {props.children}
      </div>
    </components.MultiValueContainer>
  );
}

export function TagChip(props: TagProp) {
  return (
    <div className="bg-neutral-300 rounded-full pr-2 pl-1 inline-flex items-center gap-1 self-start">
      <div
        className="h-4 w-4 rounded-full"
        style={{
          backgroundColor: props.color,
        }}
      />
      {props.label}
    </div>
  );
}
