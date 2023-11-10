import React, { forwardRef } from "react";
import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "avatarImage";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.ComponentPropsWithoutRef<
  typeof RadixAvatarPrimitive.Image
> &
  RecastThemeProps;

const AvatarImagePrimitive = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Image>,
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
      <RadixAvatarPrimitive.Image
        className={cn(classes?.root, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

AvatarImagePrimitive.displayName = "AvatarImagePrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AvatarImagePrimitive,
  DEFAULT_THEME_KEY,
);
