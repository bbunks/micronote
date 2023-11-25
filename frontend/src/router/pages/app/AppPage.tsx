import {
  notesWatcher,
  queryWatcher,
  useNotes,
} from "../../../stores/NoteStore";
import { LoadingIndicator } from "../../../components/Loading";
import { NoteCard } from "./NoteCard";
import { Masonry } from "masonic";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  resetHeader,
  setCentralElement,
  setNavToggleElement,
} from "../../../stores/HeaderSettingsStore";
import { Search } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { NewNote } from "./NewNote";
import { Note } from "../../../types/Note";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useWatcherState } from "react-state-extended";

interface Props {
  columnWidth?: number;
}

export function AppPage({ columnWidth = 360 }: Props) {
  const { state: notes, isLoading } = useNotes();
  const [modalOpen, setModalOpen] = useState(false);
  const iter = useRef(0);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [filters] = useWatcherState(queryWatcher);

  const filterCount = filters.length ?? 0;

  // Implement Search bar into header
  useEffect(() => {
    notesWatcher.addRule(() => iter.current++);
    setCentralElement(<Search />);
    setNavToggleElement(
      <>
        <FontAwesomeIcon className="h-5 w-5" icon={faMagnifyingGlass} />
        {filterCount !== 0 && (
          <p className="absolute -top-1 -right-1 bg-neutral-100 rounded-full h-5 w-5 text-primary flex items-center justify-center">
            {filterCount}
          </p>
        )}
      </>
    );
    return resetHeader;
  }, [filterCount]);

  const CardWithClick = useCallback(
    (props: { data: { note: Note } }) => (
      <NoteCard
        {...props}
        onEdit={(note: Note) => {
          setSelectedNote(note);
          setModalOpen(true);
        }}
      />
    ),
    []
  );

  //If notes state is load, return a spiner rather than the empty page
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-16">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      {modalOpen && (
        <NewNote
          defaultNoteData={selectedNote}
          closeModal={() => {
            setSelectedNote(null);
            setModalOpen(false);
          }}
        />
      )}
      <div className="px-4">
        {notes.length === 0 && (
          <p className="text-center m-12 text-primary-lighter">
            What are you thinking? Write it down.
          </p>
        )}
        <div className="mb-20">
          <Masonry
            key={iter.current}
            items={notes.map((ele) => ({ note: ele }))}
            columnGutter={16}
            columnWidth={columnWidth}
            overscanBy={5}
            render={CardWithClick}
          />
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-4 right-4 z-10 h-16 w-16 rounded-full bg-neutral-900 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-100 active:bg-neutral-700 active:text-neutral-200"
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
    </>
  );
}
