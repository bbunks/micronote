import { Watcher } from "wal.js";
import { isTokenExpired } from "../utils/JWT";

export const JwtTokenWatcher = new Watcher(document.cookie);
JwtTokenWatcher.addListener((v) => {
  document.cookie = v;
});

export const AuthenticatedWatcher = new Watcher(true);
if (isTokenExpired(JwtTokenWatcher.value)) AuthenticatedWatcher.value = false;
