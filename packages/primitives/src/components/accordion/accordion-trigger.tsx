import * as RadixAccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import {
  RecastBaseTheme,
  RecastThemeProps,
  createRecastComponent,
  getRecastClasses,
} from "@rpxl/recast";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn.js";

type BaseTheme = RecastBaseTheme<"root" | "trigger" | "icon">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAccordionPrimitive.Trigger
> &
  RecastThemeProps & {
    icon: React.ComponentType;
  };

const Component = React.forwardRef<
  React.ElementRef<typeof RadixAccordionPrimitive.Trigger>,
  Props
>(
  (
    {
      themekey,
      className,
      variants,
      modifiers,
      children,
      icon: Icon = ChevronDownIcon,
      ...props
    },
    ref,
  ) => {
    const classes = getRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
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

Component.displayName = "AccordionTriggerPrimitive";

export const AccordionTriggerPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
