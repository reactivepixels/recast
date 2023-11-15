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
  typeof RadixPopoverPrimitive.Content
> &
  RecastThemeProps;

const PopoverContentPrimitive = forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Content>,
  Props
>(
  (
    {
      themekey,
      className,
      size,
      variant,
      modifier,
      align = "center",
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <RadixPopoverPrimitive.Portal>
        <RadixPopoverPrimitive.Content
          className={cn(classes?.root, className)}
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          {...props}
        />
      </RadixPopoverPrimitive.Portal>
    );
  },
);

PopoverContentPrimitive.displayName = "PopoverContentPrimitive";

export default createRecastComponent<Props, BaseTheme>(PopoverContentPrimitive);
