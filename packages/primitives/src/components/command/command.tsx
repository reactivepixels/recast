import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import { Command as RadixCommandPrimitive } from "cmdk";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixCommandPrimitive
> &
  RecastThemeProps;

const CommandPrimitive = forwardRef<
  React.ElementRef<typeof RadixCommandPrimitive>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixCommandPrimitive
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

CommandPrimitive.displayName = "CommandPrimitive";

export default createRecastComponent<Props, BaseTheme>(CommandPrimitive);
