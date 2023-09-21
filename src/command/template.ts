import type { CAC } from "cac";

import fs from "fs-extra";

import path from "node:path";

import enquirer from "enquirer";

import {
  emptyDir,
  generateRandom,
  getVariantByFramework,
  isEmptyDir,
  isValidFramework,
  isValidPackageName,
  isValidVariant,
  loggerInfo,
  pkgFromUserAgent,
  toValidPackageName,
} from "@/shared/index";
import { ACTIVATION, fileIgnore, FRAMEWORKS } from "@/shared/config";
import { TemplateOptions } from "@/shared/types";
import { fileURLToPath } from "node:url";

interface PromptResult {
  projectName: string;
  framework: string;
  variant: string;
  overwrite: boolean;
  packageName: string;
}

export const template = async (options: TemplateOptions) => {
  if (ACTIVATION) {
    loggerInfo("template 参数信息: \n");
    console.table(options);
  }

  const { projectName } = await enquirer.prompt<PromptResult>({
    name: "projectName",
    type: "text",
    message: "请输入项目名称",
    initial: options.projectName,
  });

  const { overwrite } = await enquirer.prompt<PromptResult>({
    name: "overwrite",
    type: "confirm",
    skip: () => isEmptyDir(projectName),
    message: `${path.join(
      process.cwd(),
      projectName,
    )} \n 文件夹非空，继续操作会丢失现有的文件？`,
    result: (value) => {
      if (!isEmptyDir(projectName) && !value) {
        process.exit(1);
      }
      return value;
    },
  });

  const { packageName } = await enquirer.prompt<PromptResult>({
    name: "packageName",
    type: "text",
    skip: () => isValidPackageName(projectName),
    message: "请输入 package name",
    initial: projectName,
    validate: (value) => {
      return isValidPackageName(value) || "输入的 package name 不符合规范";
    },
    result: (value) => {
      return toValidPackageName(value);
    },
  });

  const { framework } = await enquirer.prompt<PromptResult>({
    name: "framework",
    type: "select",
    skip: () => isValidFramework(options.framework),
    message: "请选择下列的有效模板",
    choices: FRAMEWORKS.map((framework) => {
      const frameworkColor = framework.color;
      return {
        message: frameworkColor(framework.display || framework.name),
        name: framework.name,
      };
    }),
  });

  const { variant } = await enquirer.prompt<PromptResult>({
    name: "variant",
    type: "select",
    skip: () => !isValidVariant(framework),
    message: "请选择下列的有效变体",
    choices: getVariantByFramework(framework).map((variant) => {
      const variantColor = variant.color;
      return {
        message: variantColor(variant.display || variant.name),
        name: variant.name,
      };
    }),
  });

  console.log(projectName, framework, variant, overwrite, packageName);

  const root = path.join(process.cwd(), projectName);
  if (overwrite) emptyDir(root);
  const template: string = variant || framework;
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  console.log(`\nScaffolding project in ${root}...`);
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../../templates",
    `template-${template}`,
  );
  console.log(templateDir);
  fs.copySync(templateDir, projectName, {
    filter: (src: string) => {
      return !fileIgnore.find(
        (f) => f === `${path.parse(src).name}${path.parse(src).ext}`,
      );
    },
  });

  const gitignoreInfo = fs.readFileSync(
    path.resolve(templateDir, "_gitignore"),
  );
  fs.outputFile(path.join(root, ".gitignore"), gitignoreInfo);

  const pkg = fs.readJsonSync(path.resolve(templateDir, "package.json"));
  pkg.name = packageName;
  fs.outputJSONSync(path.join(root, "package.json"), pkg, {
    spaces: 2,
  });

  switch (pkgManager) {
    case "yarn":
      console.log("  yarn");
      console.log("  yarn dev");
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
};

export default function templateInstaller(cli: CAC) {
  return {
    name: "templateInstaller",
    setup: () => {
      cli
        .command("template", "快速创建CodeGenius基础项目")
        .option("-n, --project-name <project-name>", "项目名称", {
          default: `project-${generateRandom(8)}`,
        })
        .option("-f, --framework <framework>", "项目框架")
        .action(async (options) => {
          const { projectName, framework } = options;
          await template({
            projectName,
            framework,
          });
        });
    },
  };
}
