import { Watcher } from "wal.js";

export const JwtTokenWatcher = new Watcher(document.cookie);
JwtTokenWatcher.addListener((v) => {
  document.cookie = v;

  console.log(v);
});

console.log(JwtTokenWatcher.value);
