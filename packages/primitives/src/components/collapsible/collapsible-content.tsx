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

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixCollapsiblePrimitive.CollapsibleContent
> &
  RecastThemeProps;

const CollapsiblePrimitive = forwardRef<
  React.ElementRef<typeof RadixCollapsiblePrimitive.CollapsibleContent>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixCollapsiblePrimitive.CollapsibleContent
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

CollapsiblePrimitive.displayName = "CollapsiblePrimitive";

export default createRecastComponent<Props, BaseTheme>(CollapsiblePrimitive);
