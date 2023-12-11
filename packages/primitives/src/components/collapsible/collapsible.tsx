import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixCollapsiblePrimitive from "@radix-ui/react-collapsible";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixCollapsiblePrimitive.Root
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixCollapsiblePrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "CollapsiblePrimitive";

export const CollapsiblePrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
