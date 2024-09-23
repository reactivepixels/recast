"use client";

import { recast } from "@rpxl/recast";
import { ButtonPrimitive } from "@rpxl/recast-primitives";

export const Button = recast(ButtonPrimitive, {
  base: "",
});
