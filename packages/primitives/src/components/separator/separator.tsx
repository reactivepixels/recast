import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixSeparatorPrimitive from "@radix-ui/react-separator";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixSeparatorPrimitive.Root
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixSeparatorPrimitive.Root>,
  Props
>(
  (
    {
      themekey,
      className,
      variants,
      modifiers,
      decorative = true,
      orientation = "horizontal",
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
      <RadixSeparatorPrimitive.Root
        ref={ref}
        className={cn(classes?.root, className)}
        decorative={decorative}
        orientation={orientation}
        {...props}
      />
    );
  },
);

Component.displayName = "SeparatorPrimitive";

export const SeparatorPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
