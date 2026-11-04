import path from "node:path";
import { mergeConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

/** @type { import('@storybook/nextjs-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: "@storybook/nextjs-vite",
  staticDirs: [
  "../public",
  { from: "../src/assets/fonts", to: "/fonts" },
],

  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [vanillaExtractPlugin()],
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
        },
      },
    }),
};

export default config;
