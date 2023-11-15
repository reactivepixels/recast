import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixSeparatorPrimitive from "@radix-ui/react-separator";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixSeparatorPrimitive.Root
> &
  RecastThemeProps;

const SeparatorPrimitive = forwardRef<
  React.ElementRef<typeof RadixSeparatorPrimitive.Root>,
  Props
>(
  (
    {
      themekey,
      className,
      size,
      variant,
      modifier,
      decorative = true,
      orientation = "horizontal",
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

SeparatorPrimitive.displayName = "SeparatorPrimitive";

export default createRecastComponent<Props, BaseTheme>(SeparatorPrimitive);
