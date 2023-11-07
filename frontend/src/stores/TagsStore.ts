import { Watcher } from "wal.js";
import { useWatcherState } from "react-state-extended";

export const tagsWatcher = new Watcher<Tag[]>([]);

let nextUpdateTime: Date;

function updateTags() {
  if (nextUpdateTime === undefined || nextUpdateTime.getTime() < Date.now()) {
    const s = new Date();
    s.setMinutes(s.getMinutes() + 1);
    nextUpdateTime = s;

    tagsWatcher.value = [
      { label: "Idea", id: 1, color: "var(--primary)" },
      { label: "Picture", id: 2, color: "var(--secondary)" },
    ];
  }
  // TODO: fetch data from an api
}

export function useTags() {
  updateTags();

  return useWatcherState<Tag[]>(tagsWatcher)[0];
}

interface Tag {
  color: string;
  id: number;
  label: string;
}
