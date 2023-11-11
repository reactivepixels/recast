import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

const DEFAULT_THEME_KEY = "accordion";

type BaseTheme = RecastThemeProp<"root">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Root
> &
  RecastThemeProps;

const AccordionPrimitive = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Root>,
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
      <RadixAccordionPrimitive.Root
        ref={ref}
        className={cn(classes?.root, className)}
        {...props}
      />
    );
  },
);

AccordionPrimitive.displayName = "AccordionPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AccordionPrimitive,
  DEFAULT_THEME_KEY,
);
