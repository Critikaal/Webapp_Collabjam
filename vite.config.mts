import { defineConfig } from "vite";
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),
    react(), // ensure React Refresh + proper JSX transform
  ],
  resolve: {
    // force single react copy
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  ssr: {
    // prevent externalizing packages that should use the same react instance
    noExternal: ["rwsdk", "@redwoodjs/router", "@redwoodjs/auth"],
  },
});
