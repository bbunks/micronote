import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";
import { useEffect } from "react";

export const tagsWatcher = new Watcher<Tag[]>([]);

let nextUpdateTime: Date;

function updateTags() {
  // TODO: fetch data from an api
  tagsWatcher.value = [
    { label: "Hello", id: 1, color: "#000" },
    { label: "World", id: 2, color: "#000" },
    { label: "You", id: 3, color: "#000" },
    { label: "are", id: 4, color: "#000" },
    { label: "Great", id: 5, color: "#000" },
  ];
}

export function useTags() {
  useEffect(() => {
    if (nextUpdateTime === undefined || nextUpdateTime.getTime() < Date.now()) {
      const s = new Date();
      s.setMinutes(s.getMinutes() + 1);
      nextUpdateTime = s;

      updateTags();
    }
  }, []);

  return useWatcherState<Tag[]>(tagsWatcher)[0];
}

interface Tag {
  color: string;
  id: number;
  label: string;
}
