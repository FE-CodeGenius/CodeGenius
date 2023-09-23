import cac, { CAC } from "cac";

import { handleError } from "@/shared/index";

import pkg from "../package.json";
import { cmdInstaller } from "./setup";

import updateNotifier from "simple-update-notifier";

function welcome(cli: CAC) {
  cli.outputHelp();
}

export const setupCli = async () => {
  const cli = cac("cg");
  cli.command("");

  cmdInstaller(cli);

  cli.help();
  cli.version(pkg.version);
  cli.command("update", "检测 CodeGenius 版本").action(() => {
    updateNotifier({ pkg, alwaysRun: true });
  });

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
