// 开发期间使用
import { defineConfig } from "./dist/index.mjs";
import { clearInstaller } from "@codegenius/clear-plugin";
import { quantityInstaller } from "@codegenius/quantity-plugin";
import { npmDepCheckInstaller } from "@codegenius/depcheck-plugin";
import { lighthouseInstaller } from "@codegenius/lighthouse-plugin";

export default defineConfig({
  commands: {
    gituser: {
      ruleEmail: "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$",
    },
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
  ],
});
