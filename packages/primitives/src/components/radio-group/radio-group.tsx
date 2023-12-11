import React, { forwardRef } from "react";
import { cn } from "../../utils/cn.js";
import * as RadixRadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixRadioGroupPrimitive.Root
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixRadioGroupPrimitive.Root>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixRadioGroupPrimitive.Root
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

Component.displayName = "RadioGroupPrimitive";

export const RadioGroupPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
