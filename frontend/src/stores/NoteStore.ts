import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import { Note } from "../types/Note";
import { fromSearchString, toSearchString } from "../utils/SearchQS";
import AuthService from "../services/AuthService";
import { AuthenticatedWatcher, AuthenticationState } from "./AuthStore";

let isLoading = false;
let isRevalidating = false;

export const notesWatcher = new Watcher<Note[] | null>(null);
export const queryWatcher = new Watcher(
  fromSearchString(window.location.search)
);

//keep in sync with the qs
queryWatcher.addListener((v) => {
  let qs = toSearchString(v);
  if (qs.length > 0) {
    qs = "?" + qs;
  }
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qs;
  window.history.pushState({ path: newurl }, "", newurl);
});

let nextUpdateTime: Date;
let controller = new AbortController();

export function updateNotes(force?: boolean) {
  if (
    nextUpdateTime === undefined ||
    nextUpdateTime.getTime() < Date.now() ||
    force
  ) {
    if (isLoading && force) controller.abort();
    else if (isLoading) return;
    controller = new AbortController();
    isRevalidating = true;
    if (force) isLoading = true;

    AuthService.makeAuthorizedRequest("/api/note" + window.location.search, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        notesWatcher.value = json;
        isLoading = false;
        isRevalidating = false;

        const s = new Date();
        s.setMinutes(s.getMinutes() + 1);
        nextUpdateTime = s;
      })
      .catch(() => {});
  }
  // TODO: fetch data from an api
}

queryWatcher.addListener(() => updateNotes(true));
AuthenticatedWatcher.addListener((v) => {
  if (v === AuthenticationState.Authorized) updateNotes();
});

export function useNotes() {
  updateNotes();

  return {
    state: useWatcherState(notesWatcher)[0] ?? [],
    isLoading: notesWatcher.value === null || isLoading,
    isRevalidating,
  };
}
