import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import { Note } from "../types/Note";
import { fromSearchString, toSearchString } from "../utils/SearchQS";
import AuthService from "../services/AuthService";
import { JwtTokenWatcher } from "./AuthStore";
import { isTokenExpired } from "../utils/JWT";

let isLoading = true;
let isRevalidating = false;

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

export function updateNotes(jwt: string, force?: boolean) {
  if (
    nextUpdateTime === undefined ||
    nextUpdateTime.getTime() < Date.now() ||
    force
  ) {
    console.log("H");
    const s = new Date();
    s.setMinutes(s.getMinutes() + 1);
    nextUpdateTime = s;
    isRevalidating = true;
    if (force) isLoading = true;

    if (!isTokenExpired(jwt)) {
      AuthService.makeAuthorizedRequest("/api/note")
        .then((res) => res.json())
        .then((json) => {
          notesWatcher.value = json;
          isLoading = false;
          isRevalidating = false;
        });
    }
  }
  // TODO: fetch data from an api
}

queryWatcher.addListener(() => updateNotes(JwtTokenWatcher.value, true));

JwtTokenWatcher.addListener((v) => updateNotes(v, true));

export function addNote(note: Note) {
  notesWatcher.value.push(note);
  notesWatcher.triggerListeners();
}

export function useNotes() {
  updateNotes(JwtTokenWatcher.value);

  return { state: useWatcherState(notesWatcher)[0], isLoading, isRevalidating };
}
