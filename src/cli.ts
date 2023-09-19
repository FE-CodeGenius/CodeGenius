import cac from "cac";

import { handleError } from "@/shared/index";
import { commandSet } from "@/setup";

import { version } from "../package.json";

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
