import { Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { AuthenticatedWatcher, AuthenticationState } from "../stores/AuthStore";
import { useWatcherState } from "react-state-extended";

const UnauthRoutes = ["/", "/test", "/about", "/login", "/logout", "/signup"];

export function RootLayout() {
  const navigate = useNavigate();
  const { state } = useRouter();
  const [auth] = useWatcherState(AuthenticatedWatcher);

  useEffect(() => {
    if (
      auth === AuthenticationState.Unauthorized &&
      !UnauthRoutes.includes(state.location.pathname)
    ) {
      navigate({ to: "/login", replace: true });
    }
  }, [navigate, state.location.pathname, auth]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
