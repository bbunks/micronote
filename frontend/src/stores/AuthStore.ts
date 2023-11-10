import { Watcher } from "wal.js";

export const JwtTokenWatcher = new Watcher("");

export enum AuthenticationState {
  Unauthorized,
  Authorizing,
  Authorized,
}

export const AuthenticatedWatcher = new Watcher<AuthenticationState>(
  AuthenticationState.Authorizing
);
