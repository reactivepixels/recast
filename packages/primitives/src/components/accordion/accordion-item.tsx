import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Item
> &
  RecastThemeProps;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Item>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = getRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAccordionPrimitive.Item
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

Component.displayName = "AccordionItemPrimitive";

export const AccordionItemPrimitive = createRecastComponent<Props, BaseTheme>(
  Component,
);
