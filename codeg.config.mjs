// 开发期间使用
import { defineConfig } from "./dist/index.mjs";
import { clearInstaller } from "@codegenius/clear-plugin";
import { quantityInstaller } from "@codegenius/quantity-plugin";
import { npmDepCheckInstaller } from "@codegenius/depcheck-plugin";
import { lighthouseInstaller } from "@codegenius/lighthouse-plugin";
import { createProjectInstaller } from "@codegenius/create-plugin";
import { gitInitSimpleHooksInstaller } from "@codegenius/hooks-plugin";
import { gitUserInstaller } from "@codegenius/git-user-plugin";
import { npmRegistryInstaller } from "@codegenius/registry-plugin";

export default defineConfig({
  commands: {
    fix: {
      paths: ["./src", "./scripts"],
    },
    format: {
      paths: ["./src", "./scripts"],
    },
    impsort: {
      paths: ["./src", "./scripts"],
    },
  },
  plugins: [
    clearInstaller({
      files: ["./dist"],
    }),
    quantityInstaller(),
    npmDepCheckInstaller(),
    lighthouseInstaller(),
    createProjectInstaller(),
    gitInitSimpleHooksInstaller(),
    gitUserInstaller({
      ruleEmail: "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$",
    }),
    npmRegistryInstaller(),
  ],
});
