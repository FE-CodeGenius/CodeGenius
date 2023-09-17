import { loggerInfo } from "./../shared/index";
import { rimraf } from "rimraf";
import { ACTIVATION } from "../shared/config";

export const cleanUp = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("cleanUp 参数信息: \n");
    console.table(paths);
  }
  await rimraf(paths, { glob: false });
};
