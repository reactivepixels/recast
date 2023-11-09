import React, { forwardRef } from "react";
import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/utils";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "avatar";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAvatarPrimitive.Root
> &
  RecastThemeProps;

const AvatarPrimitive = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Root>,
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
      <RadixAvatarPrimitive.Root
        className={cn(classes?.root, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

AvatarPrimitive.displayName = "AvatarPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AvatarPrimitive,
  DEFAULT_THEME_KEY,
);
