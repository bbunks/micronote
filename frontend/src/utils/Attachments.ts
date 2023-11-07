export interface AttachmentType {
  id: string;
  label: string;
}

const AttachmentTypes: AttachmentType[] = [
  {
    id: "picture",
    label: "Picture",
  },
];

export function findAttachmentTypeById(id: string) {
  return AttachmentTypes.find((ele) => ele.id === id);
}
