import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof RadixAvatarPrimitive.Image>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Image>,
  Props
>(({ ...props }, ref) => {
  return <RadixAvatarPrimitive.Image ref={ref} {...props} />;
});

Component.displayName = "AvatarImagePrimitive";

export const AvatarImagePrimitive = Component;
