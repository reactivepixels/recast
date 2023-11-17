import React, { forwardRef } from "react";
import * as RadixAlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialogPrimitive.Title
> &
  RecastThemeProps;

const AlertDialogTitlePrimitive = forwardRef<
  React.ElementRef<typeof RadixAlertDialogPrimitive.Title>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAlertDialogPrimitive.Title
      ref={ref}
      className={cn(classes?.root, className)}
      {...props}
    />
  );
});

AlertDialogTitlePrimitive.displayName = "AlertDialogTitlePrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogTitlePrimitive,
);
