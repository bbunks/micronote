import { MultiValueGenericProps } from "react-select";

interface TagProp {
  color: string;
  value: number;
}

export function TagChip(props: MultiValueGenericProps<TagProp>) {
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
