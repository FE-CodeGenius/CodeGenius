import cac from "cac";

import { handleError, setup } from "@/helper";
import { plugins } from "@/index";

import pkg from "../package.json";

const setupCli = async () => {
  const cli = cac("codeg");

  await setup(cli, plugins);

  cli.help();
  cli.version(pkg.version);

  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
};

setupCli().catch(handleError);
