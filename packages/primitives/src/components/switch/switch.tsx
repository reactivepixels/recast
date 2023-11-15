import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixSwitchPrimitive from "@radix-ui/react-switch";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root" | "thumb">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixSwitchPrimitive.Root
> &
  RecastThemeProps;

const SwitchPrimitive = forwardRef<
  React.ElementRef<typeof RadixSwitchPrimitive.Root>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixSwitchPrimitive.Root
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    >
      <RadixSwitchPrimitive.Thumb className={classes?.thumb} />
    </RadixSwitchPrimitive.Root>
  );
});

SwitchPrimitive.displayName = "SwitchPrimitive";

export default createRecastComponent<Props, BaseTheme>(SwitchPrimitive);
