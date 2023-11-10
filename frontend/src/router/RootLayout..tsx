import { Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";
import { AuthenticatedWatcher } from "../stores/AuthStore";

const UnauthRoutes = ["/", "/test", "/about"];

export function RootLayout() {
  const navigate = useNavigate();
  const { state } = useRouter();
  useEffect(() => {
    const navToLogin = (v: boolean) => {
      if (!v && !UnauthRoutes.includes(state.location.pathname)) {
        navigate({ to: "/login" });
      }
    };
    navToLogin(AuthenticatedWatcher.value);

    AuthenticatedWatcher.addListener(navToLogin);
    return () => AuthenticatedWatcher.removeListener(navToLogin);
  }, [navigate, state.location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
