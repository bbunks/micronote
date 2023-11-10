import {
  AuthenticatedWatcher,
  AuthenticationState,
  JwtTokenWatcher,
} from "../stores/AuthStore";
import { isTokenExpired } from "../utils/JWT";

async function login(username: string, password: string) {
  const res = await fetch("/auth/generateToken", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const token = await res.text();

  AuthenticatedWatcher.value = AuthenticationState.Authorized;
  JwtTokenWatcher.value = token;

  return token;
}

async function refreshToken() {
  const res = await fetch("/auth/refreshToken", {
    method: "POST",
  });

  if (res.status === 401) {
    logout();
    throw "Unauthorized";
  }

  const token = await res.text();

  AuthenticatedWatcher.value = AuthenticationState.Authorized;
  JwtTokenWatcher.value = token;

  return token;
}

async function makeAuthorizedRequest(uri: string, options?: RequestInit) {
  function wrapper() {
    let { headers, ...rest } = options ?? {};
    const outHeaders = {
      Authorization: "Bearer " + JwtTokenWatcher.value,
      ...headers,
    };

    return fetch(uri, {
      headers: outHeaders,
      ...rest,
    });
  }

  if (
    AuthenticatedWatcher.value !== AuthenticationState.Authorized ||
    isTokenExpired(JwtTokenWatcher.value) ||
    JwtTokenWatcher.value === ""
  ) {
    await refreshToken();
    return wrapper();
  } else {
    return wrapper();
  }
}

function logout() {
  AuthenticatedWatcher.value = AuthenticationState.Unauthorized;
  JwtTokenWatcher.value = "";
  fetch("/auth/logout");
}

const AuthService = {
  makeAuthorizedRequest,
  logout,
  login,
  refreshToken,
};

export default AuthService;
