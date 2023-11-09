import { Content } from "./Content";
import { Tag } from "./Tag";

export interface Note {
  id: number;
  title: string;
  createdDate: string;
  contents: Content[];
  tags: Tag[];
}
