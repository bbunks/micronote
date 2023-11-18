export enum ContentType {
  PICTURE = "PICTURE",
  TEXT = "TEXT",
}

export interface Content {
  id?: number;
  type: ContentType;
  value: string;
}
