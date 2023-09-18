import { execCommand } from "../shared/index";

export const npmDepCheck = async () => {
  await execCommand("npx", ["npm-check"], {
    stdio: "inherit",
  });
};
