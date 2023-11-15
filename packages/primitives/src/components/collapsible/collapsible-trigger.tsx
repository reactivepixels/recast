import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixCollapsiblePrimitive from "@radix-ui/react-collapsible";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixCollapsiblePrimitive.CollapsibleTrigger
> &
  RecastThemeProps;

const CollapsiblePrimitive = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.CollapsibleTrigger>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixCollapsiblePrimitive.CollapsibleTrigger
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

CollapsiblePrimitive.displayName = "CollapsiblePrimitive";

export default createRecastComponent<Props, BaseTheme>(CollapsiblePrimitive);
