/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import "reflect-metadata";

export const metadata = {};

export function args(options: {
  rawName: string;
  description: string;
  default: string | Array<unknown> | boolean;
}) {
  return (target: any, propertyKey: string) => {
    const targetName = target.constructor.name;
    const data = {
      [propertyKey]: options,
      ...Reflect.getMetadata(`${targetName}`, metadata),
    };
    Reflect.defineMetadata(`${targetName}`, data, metadata);
  };
}

export function action(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const targetName = target.constructor.name;
  const data = {
    action: descriptor.value,
    ...Reflect.getMetadata(`${targetName}`, metadata),
  };
  Reflect.defineMetadata(`${targetName}`, data, metadata);
}

export function command(cmd: string, description: string) {
  return (target: any) => {
    const targetName = target.name;
    const data = {
      cmd,
      description,
      ...Reflect.getMetadata(`${targetName}`, metadata),
    };
    Reflect.defineMetadata(`${targetName}`, data, metadata);
  };
}

export const getMetadata = (className: string) =>
  Reflect.getMetadata(`${className}`, metadata);
