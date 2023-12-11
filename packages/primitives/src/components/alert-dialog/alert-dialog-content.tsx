import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root" | "content">;

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Content
> &
  RecastThemeProps;

const Component = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Content>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAlertDialogPrimitive.Portal>
      <RadixAlertDialogPrimitive.Overlay
        className={cn(classes?.root, className)}
      />
      <RadixAlertDialogPrimitive.Content
        ref={ref}
        className={cn(classes?.content, className)}
        {...props}
      />
    </RadixAlertDialogPrimitive.Portal>
  );
});

Component.displayName = "AlertDialogContentPrimitive";

export const AlertDialogContentPrimitive = createRecastComponent<
  Props,
  BaseTheme
>(Component);
