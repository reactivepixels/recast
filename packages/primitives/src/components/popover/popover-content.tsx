import * as RadixPopoverPrimitive from "@radix-ui/react-popover";

import React, { forwardRef } from "react";
import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixPopoverPrimitive.Content
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixPopoverPrimitive.Content>,
  Props
>(
  (
    {
      themekey,
      className,
      variants,
      modifiers,
      align = "center",
      sideOffset = 4,
      ...props
    },
    ref,
  ) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
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

Component.displayName = "PopoverContentPrimitive";

export const PopoverContentPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
