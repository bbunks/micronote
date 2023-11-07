import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/shared/Header";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
