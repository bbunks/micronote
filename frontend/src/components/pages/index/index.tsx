import { useNotes } from "../../../stores/NoteStore";
import { LoadingIndicator } from "../../shared/Loading";
import { NoteCard } from "./NoteCard";
import { Masonry } from "masonic";

interface Props {
  columnCount?: number;
}

export function Index({ columnCount = 3 }: Props) {
  const { state: notes, isLoading } = useNotes();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-16">
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <div className="px-4">
      <div>
        <Masonry
          items={notes.map((ele) => ({ note: ele }))}
          columnGutter={16}
          columnWidth={360}
          overscanBy={5}
          render={NoteCard}
        />
      </div>
    </div>
  );
}
