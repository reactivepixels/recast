import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "accordionItem";

type BaseTheme = RecastThemeProp<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Item
> &
  RecastThemeProps;

const AccordionItemPrimitive = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Item>,
  Props
>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      ...props
    },
    ref,
  ) => {
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
  },
);

AccordionItemPrimitive.displayName = "AccordionItemPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AccordionItemPrimitive,
  DEFAULT_THEME_KEY,
);
