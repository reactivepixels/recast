import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "thumb">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroupPrimitive.Root
> &
  RecastThemeProps;

const ToggleGroupPrimitive = forwardRef<
  React.ElementRef<typeof RadixToggleGroupPrimitive.Root>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixToggleGroupPrimitive.Root
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

ToggleGroupPrimitive.displayName = "ToggleGroupPrimitive";

export default createRecastComponent<Props, BaseTheme>(ToggleGroupPrimitive);
