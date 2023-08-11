"use client";

import { ButtonPrimitive } from "@rpxl/recast-primitives/client";
import { styles } from "../base/Button";
import { DEFAULT_RECAST_CLIENT_OPTIONS } from "@/app/constants";

export const Button = ButtonPrimitive.recast(
  "Button",
  styles
  // DEFAULT_RECAST_CLIENT_OPTIONS
  // {
  //   viewports: { sm: 500, md: 800 },
  // }
);
