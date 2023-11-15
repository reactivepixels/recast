import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn.js";
import {
  RecastThemeProp,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastThemeProp<"root" | "content">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Content
> &
  RecastThemeProps;

const AccordionContentPrimitive = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Content>,
  Props
>(
  (
    { themekey, className, size, variant, modifier, children, ...props },
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
);
