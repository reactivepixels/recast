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
  typeof RadixCollapsiblePrimitive.CollapsibleTrigger
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.CollapsibleTrigger>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixCollapsiblePrimitive.CollapsibleTrigger
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "CollapsibleTriggerPrimitive";

export const CollapsibleTriggerPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
