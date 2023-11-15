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

  if (res.ok) {
    const token = await res.text();

    AuthenticatedWatcher.value = AuthenticationState.Authorized;
    JwtTokenWatcher.value = token;

    return token;
  } else {
    throw "Invalid username or password";
  }
}

let currentRequest: Promise<string> | null = null;

function refreshToken() {
  if (currentRequest === null) {
    currentRequest = fetch("/auth/refreshToken", {
      method: "POST",
    })
      .then((res) => {
        currentRequest = null;

        console.log(res);

        if (res.status === 403) {
          logout();
          throw "Unauthorized";
        }

        return res.text();
      })
      .then((token) => {
        AuthenticatedWatcher.value = AuthenticationState.Authorized;
        JwtTokenWatcher.value = token;

        return token;
      });
  }
  return currentRequest;
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

  console.log(uri);

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

async function logout() {
  const res = await fetch("/auth/logout");
  if (res.ok) {
    JwtTokenWatcher.value = "";
    AuthenticatedWatcher.value = AuthenticationState.Unauthorized;
  }
}

async function signup(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const res = await fetch("/auth/createUser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  console.log(res);

  if (res.ok) {
    const token = await res.text();

    AuthenticatedWatcher.value = AuthenticationState.Authorized;
    JwtTokenWatcher.value = token;

    return token;
  } else {
    throw await res.text();
  }
}

const AuthService = {
  makeAuthorizedRequest,
  signup,
  login,
  logout,
  refreshToken,
};

export default AuthService;
