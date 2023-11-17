import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixTogglePrimitive from "@radix-ui/react-toggle";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "thumb">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixTogglePrimitive.Root
> &
  RecastThemeProps;

const TogglePrimitive = forwardRef<
  React.ElementRef<typeof RadixTogglePrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixTogglePrimitive.Root
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

TogglePrimitive.displayName = "TogglePrimitive";

export default createRecastComponent<Props, BaseTheme>(TogglePrimitive);
