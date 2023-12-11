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
    const classes = useRecastClasses<BaseTheme>({
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
