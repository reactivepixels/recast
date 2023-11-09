import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/utils";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "accordionContent";

type BaseTheme = RecastThemeProp<"root"> & RecastThemeProp<"content">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Content
> &
  RecastThemeProps;

const AccordionContentPrimitive = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Content>,
  Props
>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      className,
      size,
      variant,
      modifier,
      children,
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
      <RadixAccordionPrimitive.Content
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      >
        <div className={cn(classes?.content, className)}>{children}</div>
      </RadixAccordionPrimitive.Content>
    );
  },
);

AccordionContentPrimitive.displayName = "AccordionContentPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AccordionContentPrimitive,
  DEFAULT_THEME_KEY,
);

export { AccordionContentPrimitive };
