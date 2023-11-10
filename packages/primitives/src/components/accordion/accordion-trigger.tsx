import * as React from "react";
import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "accordionTrigger";

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"trigger"> &
  RecastThemeProp<"icon">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Trigger
> &
  RecastThemeProps & {
    icon: React.ComponentType;
  };

const AccordionTriggerPrimitive = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Trigger>,
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
      icon: Icon = ChevronDownIcon,
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
      <RadixAccordionPrimitive.Header className={cn(classes?.root, className)}>
        <RadixAccordionPrimitive.Trigger
          ref={ref}
          className={cn(classes?.trigger, className)}
          {...props}
        >
          {children}
          <Icon className={cn(classes?.icon, className)} />
        </RadixAccordionPrimitive.Trigger>
      </RadixAccordionPrimitive.Header>
    );
  },
);

AccordionTriggerPrimitive.displayName = "AccordionTriggerPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AccordionTriggerPrimitive,
  DEFAULT_THEME_KEY,
);
