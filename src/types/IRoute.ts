import { ComponentType } from "react";

export interface IRoute {
  key: string;
  title: string;
  path: string;
  component: ComponentType;
}
