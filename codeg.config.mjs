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
import { gitCommitVerifyInstaller } from "@codegenius/verify-plugin";
import { templateInstaller } from "@codegenius/template-plugin";
import { prettierFormatInstaller } from "@codegenius/format-plugin";
import { impSortInstaller } from "@codegenius/impsort-plugin";

export default defineConfig({
  commands: {
    fix: {
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
    gitCommitVerifyInstaller(),
    templateInstaller(),
    prettierFormatInstaller({
      files: ["./src", "./scripts"],
    }),
    impSortInstaller({
      files: ["./src", "./scripts"],
    }),
  ],
});
