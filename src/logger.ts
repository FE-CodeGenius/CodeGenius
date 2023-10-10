import { blue, green, red, yellow } from "kolorist";

import { ACTIVATION } from "@/config";

export const loggerInfo = (content: string) => {
  if (ACTIVATION) {
    console.log(blue("[CODEG INFO HINT]:"), content as string);
  }
};

export const loggerWarring = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(yellow("[CODEG WARRING HINT]:"), content as string);
  }
};

export const loggerSuccess = (content: string) => {
  if (ACTIVATION) {
    console.log(green("[CODEG SUCCESS HINT]:"), content as string);
  }
};

export const loggerError = (content: string | unknown) => {
  if (ACTIVATION) {
    console.log(red("[CODEG ERROR HINT]:"), content as string);
  }
};

export const printInfo = (content: string) => {
  console.log(blue("[CODEG INFO HINT]:"), content as string);
};

export const printWarring = (content: string) => {
  console.log(yellow("[CODEG WARRING HINT]:"), content as string);
};

export const printSuccess = (content: string) => {
  console.log(green("[CODEG SUCCESS HINT]:"), content as string);
};

export const printError = (content: string | unknown) => {
  console.log(red("[CODEG ERROR HINT]:"), content as string);
};
