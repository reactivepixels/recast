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
  typeof RadixAvatarPrimitive.Image
> &
  RecastThemeProps;

const AvatarImagePrimitive = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Image>,
  Props
>(({ themekey, className, size, variant, modifier, ...props }, ref) => {
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
});

AvatarImagePrimitive.displayName = "AvatarImagePrimitive";

export default createRecastComponent<Props, BaseTheme>(AvatarImagePrimitive);
