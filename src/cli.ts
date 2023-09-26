import cac from "cac";

import { cmdInstaller, handleError } from "@/helper";
import config from "@/index";

import pkg from "../package.json";

const setupCli = async () => {
  const cli = cac("codeg");

  cmdInstaller(cli, config);

  cli.help();
  cli.version(pkg.version);

  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
};

setupCli().catch(handleError);
