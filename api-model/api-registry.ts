import { npmRegistry } from "../src/index";

(async () => {
  await npmRegistry("https://registry.npmjs.org/");
})();
