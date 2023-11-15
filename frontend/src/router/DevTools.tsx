import { lazy } from "react";

export const TanStackRouterDevtools =
  import.meta.env.NODE_ENV !== "production"
    ? lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      ) // Render nothing in production
    : () => null;
