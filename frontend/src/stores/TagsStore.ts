import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import AuthService from "../services/AuthService";

export const tagsWatcher = new Watcher<Tag[] | null>(null);

let nextUpdateTime: Date;
let isLoading = false;
let isRevalidating = false;
let controller = new AbortController();

function updateTags(force?: boolean) {
  if (
    nextUpdateTime === undefined ||
    nextUpdateTime.getTime() < Date.now() ||
    force
  ) {
    // TODO: fetch data from an api
    if (isLoading && force) controller.abort();
    else if (isLoading) return;
    controller = new AbortController();
    isRevalidating = true;
    if (force) isLoading = true;

    AuthService.makeAuthorizedRequest("/api/tag", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        tagsWatcher.value = json;
        isLoading = false;
        isRevalidating = false;

        const s = new Date();
        s.setMinutes(s.getMinutes() + 1);
        nextUpdateTime = s;
      })
      .catch(() => {});
  }
}

export function useTags() {
  updateTags();

  return {
    state: useWatcherState(tagsWatcher)[0] ?? [],
    isLoading: tagsWatcher.value === null || isLoading,
    isRevalidating,
  };
}

interface Tag {
  color: string;
  id: number;
  label: string;
}
