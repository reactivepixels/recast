import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Root
> &
  RecastThemeProps;

const RadioGroupPrimitive = forwardRef<
  React.ElementRef<typeof RadixRadioGroupPrimitive.Root>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixRadioGroupPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

RadioGroupPrimitive.displayName = "RadioGroupPrimitive";

export default createRecastComponent<Props, BaseTheme>(RadioGroupPrimitive);
