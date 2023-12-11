import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "content">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Content
> &
  RecastThemeProps;

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Content>,
  Props
>(({ themekey, className, variants, modifiers, children, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
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
});

Component.displayName = "AccordionContentPrimitive";

export const AccordionContentPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
