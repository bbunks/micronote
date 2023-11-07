import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import { Note } from "../types/Note";
import { DateTime } from "luxon";
import { fromSearchString, toSearchString } from "../utils/SearchQS";

const noteTemplate: Note = {
  id: 1,
  title: "This is a title",
  date: DateTime.now(),
  content: {
    text: "This is a longer message that will be used as an example in the body of a note.",
  },
  tags: [{ label: "Idea", id: 1, color: "var(--primary)" }],
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
  tags: [{ label: "Picture", id: 2, color: "var(--secondary)" }],
};

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

let isLoading = false;

export const notesWatcher = new Watcher<Note[]>([]);
export const queryWatcher = new Watcher(
  fromSearchString(window.location.search)
);

//keep in sync with the qs
queryWatcher.addListener((v) => {
  let qs = toSearchString(v);
  if (qs.length > 0) {
    qs = "?" + qs;
  }
  console.log(qs);
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qs;
  window.history.pushState({ path: newurl }, "", newurl);
  console.log("Updating URL to: " + newurl);
});

let nextUpdateTime: Date;

export function updateNotes(force?: boolean) {
  if (
    nextUpdateTime === undefined ||
    nextUpdateTime.getTime() < Date.now() ||
    force
  ) {
    console.log("H");
    const s = new Date();
    s.setMinutes(s.getMinutes() + 1);
    nextUpdateTime = s;
    isLoading = true;

    setTimeout(() => {
      notesWatcher.value = [
        ...tempList.filter((item) => {
          const tags = queryWatcher.value.filter((ele) => (ele.type = "tag"));
          if (tags.length == 0) return true;
          // Filter tags based on whether their IDs match any of the tag IDs in tagIds array of objects
          const matchingTags = item.tags.filter((tag) =>
            tags.some((tagId) => parseInt(tagId.value) === tag.id)
          );
          return matchingTags.length > 0; // Check if there are matching tags
        }),
      ];
      isLoading = false;
    }, 1000);
  }
  // TODO: fetch data from an api
}

queryWatcher.addListener(() => updateNotes(true));

export function addNote(note: Note) {
  notesWatcher.value.push(note);
  notesWatcher.triggerListeners();
}

export function useNotes() {
  updateNotes();

  return { state: useWatcherState(notesWatcher)[0], isLoading };
}
