import { Router, Route, RootRoute } from "@tanstack/react-router";
import { RootLayout } from "./RootLayout.";
import { LandingPage } from "./pages/landing/LandingPage";
import { LoginPage } from "./pages/login/LoginPage";
import { AppPage } from "./pages/app/AppPage";
import QueryString from "qs";

// Create a root route
const rootRoute = new RootRoute({
  component: RootLayout,
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppPage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([loginRoute, appRoute]),
]);

// Create the router using your route tree
export const router = new Router({
  routeTree,
  parseSearch: (a) => {
    return QueryString.parse(a.slice(1));
  },
  stringifySearch: (a) =>
    QueryString.stringify(a).length > 0 ? "?" + QueryString.stringify(a) : "",
});

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
