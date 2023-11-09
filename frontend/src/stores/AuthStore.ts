import { Watcher } from "wal.js";

export const JwtTokenWatcher = new Watcher(document.cookie);
JwtTokenWatcher.addListener((v) => {
  document.cookie = v;
});
