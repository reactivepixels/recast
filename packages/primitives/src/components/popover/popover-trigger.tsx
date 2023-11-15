import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixPopoverPrimitive from "@radix-ui/react-popover";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Trigger
> &
  RecastThemeProps;

const PopoverTriggerPrimitive = forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Trigger>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixPopoverPrimitive.Trigger
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

PopoverTriggerPrimitive.displayName = "PopoverTriggerPrimitive";

export default createRecastComponent<Props, BaseTheme>(PopoverTriggerPrimitive);
