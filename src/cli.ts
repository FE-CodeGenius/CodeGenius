import { handleError } from "./shared/index";
import { version } from "../package.json";
import { commandSet } from "./setup";
import cac from "cac";

export const setupCli = async () => {
  const cli = cac("cg");

  Object.keys(commandSet).forEach((key) => {
    commandSet[key](cli);
  });

  cli.help();
  cli.version(version);

  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
};

setupCli().catch(handleError);
