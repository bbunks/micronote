import { Watcher } from "wal.js";
export const JwtTokenWatcher = new Watcher("");

export enum AuthenticationState {
  Unauthorized = "unauthorized",
  Authorizing = "authorizing",
  Authorized = "authorized",
}

export const AuthenticatedWatcher = new Watcher<AuthenticationState>(
  AuthenticationState.Authorizing
);
AuthenticatedWatcher.addListener((v) => console.log(v));
