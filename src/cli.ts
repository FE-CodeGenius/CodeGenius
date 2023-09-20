import cac, { CAC } from "cac";

import { handleError } from "@/shared/index";

import { version } from "../package.json";
import { cmdInstaller } from "./setup";

function welcome(cli: CAC) {
  cli.outputHelp();
}

export const setupCli = async () => {
  const cli = cac("cg");
  cli.command("");

  cmdInstaller(cli);

  cli.help();
  cli.version(version);

  cli.on("command:!", () => {
    welcome(cli);
  });

  cli.on("command:*", () => {
    welcome(cli);
  });

  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
};

setupCli().catch(handleError);
