import { useNotes } from "../../../stores/NoteStore";
import { LoadingIndicator } from "../../../components/Loading";
import { NoteCard } from "./NoteCard";
import { Masonry } from "masonic";
import { useEffect } from "react";
import { setCentralElement } from "../../../stores/HeaderSettingsStore";
import { Search } from "../../../components/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

interface Props {
  columnWidth?: number;
}

export function Index({ columnWidth = 360 }: Props) {
  const { state: notes, isLoading } = useNotes();

  useEffect(() => {
    setCentralElement(<Search />);
    return () => setCentralElement(null);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-16">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="">
        <Masonry
          items={notes.map((ele) => ({ note: ele }))}
          columnGutter={16}
          columnWidth={columnWidth}
          overscanBy={5}
          render={NoteCard}
        />
      </div>
      <button className="fixed bottom-4 right-4 z-10 h-16 w-16 rounded-full bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-100 active:bg-neutral-700 active:text-neutral-200">
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
    </div>
  );
}