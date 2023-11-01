import { Attachment } from "./Attachment";
import { Tag } from "./Tag";
import { DateTime } from "luxon";

export interface Note {
  id: number;
  title: string;
  date: DateTime;
  content: {
    text?: string;
    attachments?: Attachment[];
  };
  tags: Tag[];
}
