export enum ContentType {
  PICTURE = "PICTURE",
  TEXT = "TEXT",
}

export interface Content {
  type: ContentType;
  value: string;
}
