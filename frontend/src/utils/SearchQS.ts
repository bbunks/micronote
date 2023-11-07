import { Tag } from "../types/Tag";
import { AttachmentType, findAttachmentTypeById } from "./Attachments";
import qs from "qs";

type SearchItemType = "attachment" | "tag" | "contains";

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
  return input
    .reduce((p, i) => {
      return p + i.type + "=" + i.value + "&";
    }, "")
    .slice(0, -1);
}

export function fromSearchString(input: string): SearchObject[] {
  console.log(
    Object.entries(qs.parse(input.slice(1))).map((ele) => ({
      type: ele[0],
      value: ele[1],
    }))
  );
  return Object.entries(qs.parse(input.slice(1))).map((ele) => ({
    type: ele[0],
    value: ele[1],
  }));
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
    case "attachment":
      attachment = findAttachmentTypeById(searchObject.value) ?? null;
      if (!attachment) return null;
      return {
        type: "attachment",
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
