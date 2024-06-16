import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcssPresetEnv from "postcss-preset-env";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), checker({ typescript: true })],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  resolve: {
    alias: [{ find: "src", replacement: resolve(fileURLToPath(new URL(".", import.meta.url)), "src") }],
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv],
    },
  },
});
