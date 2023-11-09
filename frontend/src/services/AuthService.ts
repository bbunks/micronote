import { JwtTokenWatcher } from "../stores/AuthStore";

function generateToken(
  username: string,
  password: string,
  cb: (token: string) => void
) {
  fetch("/auth/generateToken", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then(cb);
}

function makeAuthorizedRequest(uri: string, options?: RequestInit) {
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

function logout() {
  JwtTokenWatcher.value = "";
}

const AuthService = {
  generateToken,
  makeAuthorizedRequest,
  logout,
};

export default AuthService;
