import React, { forwardRef } from "react";
import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "avatarFallback";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAvatarPrimitive.Fallback
> &
  RecastThemeProps;

const AvatarFallbackPrimitive = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Fallback>,
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
      <RadixAvatarPrimitive.Fallback
        className={cn(classes?.root, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

AvatarFallbackPrimitive.displayName = "AvatarFallbackPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AvatarFallbackPrimitive,
  DEFAULT_THEME_KEY,
);
