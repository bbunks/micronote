import { Tag } from "../types/Tag";
import { AttachmentType, findAttachmentTypeById } from "./Attachments";
import qs from "qs";

type SearchItemType = "content" | "tag" | "contains";

export interface SearchObject {
  type: SearchItemType;
  value: string;
}

export interface SearchOption {
  type: SearchItemType;
  color?: string;
  value: string | number;
  label: string;
}

export function toSearchString(input: SearchObject[]) {
  return qs.stringify(input);
}

export function fromSearchString(input: string): SearchObject[] {
  // @ts-expect-error because you can not strongly type a QS
  return Object.values(qs.parse(input.slice(1))) as SearchObject[];
}

export function mapToSearchObject(
  searchOption: SearchOption
): SearchObject | null {
  return {
    type: searchOption.type,
    value: searchOption.value + "",
  };
}

export function mapFromSearchObject(
  searchObject: SearchObject,
  tags: Tag[]
): SearchOption | null {
  let tag: Tag | null;
  let attachment: AttachmentType | null;
  switch (searchObject.type) {
    case "content":
      attachment = findAttachmentTypeById(searchObject.value) ?? null;
      if (!attachment) return null;
      return {
        type: "content",
        label: attachment?.label,
        value: searchObject.value,
      };
    case "tag":
      tag =
        tags.find((fele) => parseInt(searchObject.value) === fele.id) ?? null;
      if (!tag) return null;
      return {
        type: "tag",
        label: tag.label,
        value: tag.id,
        color: tag.color,
      };
    case "contains":
      return {
        type: "contains",
        label: searchObject.value,
        value: searchObject.value,
      };
  }
}

export function mapSearchObjects(
  searchObjects: SearchObject[],
  tags: Tag[]
): SearchOption[] {
  return searchObjects
    .map((ele) => {
      return mapFromSearchObject(ele, tags);
    })
    .filter(Boolean) as SearchOption[];
}
