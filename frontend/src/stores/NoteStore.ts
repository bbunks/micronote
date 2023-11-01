import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import { Note } from "../types/Note";
import { DateTime } from "luxon";

const noteTemplate: Note = {
  id: 1,
  title: "This is a title",
  date: DateTime.now(),
  content: {
    text: "This is a longer message that will be used as an example in the body of a note.",
  },
  tags: [
    {
      label: "Pictures",
      color: "var(--primary)",
      id: 1,
    },
  ],
};

const imgTemplate: Note = {
  id: 1,
  title: "This is a title",
  date: DateTime.now(),
  content: {
    attachments: [
      {
        type: "image",
        path: "/sunset.jpg",
      },
    ],
  },
  tags: [
    {
      label: "Pictures",
      color: "var(--primary)",
      id: 1,
    },
  ],
};

let isLoading = false;

const tempList: Note[] = [
  noteTemplate,
  imgTemplate,
  noteTemplate,
  imgTemplate,
  noteTemplate,
  noteTemplate,
  noteTemplate,
  imgTemplate,
  noteTemplate,
  noteTemplate,
  imgTemplate,
  noteTemplate,
  noteTemplate,
];

export const notesWatcher = new Watcher<Note[]>([]);

let nextUpdateTime: Date;

export function updateNotes() {
  if (nextUpdateTime === undefined || nextUpdateTime.getTime() < Date.now()) {
    const s = new Date();
    s.setMinutes(s.getMinutes() + 1);
    nextUpdateTime = s;
    isLoading = true;

    setTimeout(() => {
      notesWatcher.value = [...tempList];
      isLoading = false;
    }, 3000);
  }
  // TODO: fetch data from an api
}

export function useNotes() {
  updateNotes();

  return { state: useWatcherState(notesWatcher)[0], isLoading };
}
