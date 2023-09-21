import { resolve } from "path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index", "src/cli"],
  clean: true,
  declaration: true,
  alias: {
    "@": resolve(__dirname, "src"),
  },
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
});
