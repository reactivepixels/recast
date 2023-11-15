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

const AccordionItemPrimitive = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Item>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    size,
    variant,
    modifier,
  });

  return (
    <RadixAccordionPrimitive.Item
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

AccordionItemPrimitive.displayName = "AccordionItemPrimitive";

export default createRecastComponent<Props, BaseTheme>(AccordionItemPrimitive);
