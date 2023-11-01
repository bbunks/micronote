import { MultiValueGenericProps } from "react-select";

interface TagProp {
  color?: string;
  value?: number;
  label?: string;
}

export function SelectTagChip(props: MultiValueGenericProps<TagProp>) {
  return (
    <div
      className="bg-neutral-300 rounded-full pr-2 pl-1 flex items-center gap-1"
      {...props}
    >
      <div
        className="h-4 w-4 rounded-full"
        style={{
          backgroundColor: props.data.color,
        }}
      />
      {props.children}
    </div>
  );
}

export function TagChip(props: TagProp) {
  return (
    <div
      className="bg-neutral-300 rounded-full pr-2 pl-1 inline-flex items-center gap-1 self-start"
      {...props}
    >
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
