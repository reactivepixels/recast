import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixPopoverPrimitive from "@radix-ui/react-popover";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Trigger
> &
  RecastThemeProps;

const PopoverTriggerPrimitive = forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Trigger>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
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
