import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    build: {
      outDir:
        env.NODE_ENV === "production"
          ? "../backend/src/main/resources/static"
          : "./dist",
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          ws: true,
        },
        "/auth": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
