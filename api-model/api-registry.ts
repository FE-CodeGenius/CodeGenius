import { npmRegistry } from "code-genius";

(async () => {
  await npmRegistry("https://registry.npmjs.org/");
})();
