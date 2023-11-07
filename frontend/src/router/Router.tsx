import { Router, Route, RootRoute } from "@tanstack/react-router";
import { Index } from "./pages/index/index";
import { RootLayout } from "./RootLayout.";

// Create a root route
const rootRoute = new RootRoute({
  component: RootLayout,
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
