export function decodeJWT(token: string) {
  const split = token.split(".");
  if (split.length <= 1) return {};
  const base64Url = split[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function isTokenExpired(token: string) {
  const { exp } = decodeJWT(token);
  const expired = Date.now() >= exp * 1000;
  return expired;
}
