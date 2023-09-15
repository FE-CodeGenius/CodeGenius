import { handleError } from "./shared/index";
import { version } from "../package.json";
import { setupSet } from "./setup";
import cac from "cac";

export const setupCli = async () => {
  const cli = cac("cg");

  Object.keys(setupSet).forEach((key) => {
    setupSet[key](cli);
  });

  cli.help();
  cli.version(version);

  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
};

setupCli().catch(handleError);
