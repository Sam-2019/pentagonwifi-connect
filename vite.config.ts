import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: process.env.VITE_BASE_PATH || "Pentagon-Wifi-Onboarding",
}));


function componentTagger() {
  return {
    name: "component-tagger",
    transform(code: string, id: string): string {
      if (id.endsWith(".tsx") || id.endsWith(".jsx")) {
      const tag = `/* Component: ${path.basename(id)} */\n`;
      return tag + code;
      }
      return code;
    },
  };
}

