import cac from "cac";

import { handleError } from "@/shared/index";

import pkg from "../package.json";
import { cmdInstaller } from "./setup";

export const setupCli = async () => {
  const cli = cac("codeg");

  cmdInstaller(cli);

  cli.help();
  cli.version(pkg.version);

  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
};

setupCli().catch(handleError);
