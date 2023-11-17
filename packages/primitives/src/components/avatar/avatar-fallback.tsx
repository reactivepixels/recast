import React, { forwardRef } from "react";
import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../utils/cn.js";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAvatarPrimitive.Fallback
> &
  RecastThemeProps;

const AvatarFallbackPrimitive = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Fallback>,
  Props
>(({ themekey, className, variants, modifiers, ...props }, ref) => {
  const classes = useRecastClasses<BaseTheme>({
    themekey,
    variants,
    modifiers,
  });

  return (
    <RadixAvatarPrimitive.Fallback
      className={cn(classes?.root, className)}
      ref={ref}
      {...props}
    />
  );
});

AvatarFallbackPrimitive.displayName = "AvatarFallbackPrimitive";

export default createRecastComponent<Props, BaseTheme>(AvatarFallbackPrimitive);
