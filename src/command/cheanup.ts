import { rimraf } from "rimraf";
import { green } from "kolorist";
import { ACTIVATION } from "../shared/config";

export const cleanUp = async (paths: string[]) => {
  if (ACTIVATION) {
    console.log(`${green("cleanUp 参数信息: \n")}`);
    console.table(paths);
  }
  await rimraf(paths, { glob: false });
};
