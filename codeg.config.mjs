import { defineConfig } from "./dist/index.mjs";

export default defineConfig({
  commands: {
    gituser: {
      ruleEmail: "^[a-zA-Z0-9._%+-]+@(gmail)\\.(com)$",
    },
    clear: {
      files: ["./dist"]
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
});
