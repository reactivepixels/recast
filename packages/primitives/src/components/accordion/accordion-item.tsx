import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Item
> &
  RecastThemeProps;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Item>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
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
