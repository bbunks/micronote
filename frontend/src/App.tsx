import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router/Router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
