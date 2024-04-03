import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<
  typeof RadixAvatarPrimitive.Fallback
>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Fallback>,
  Props
>(({ ...props }, ref) => {
  return <RadixAvatarPrimitive.Fallback ref={ref} {...props} />;
});

Component.displayName = "AvatarFallbackPrimitive";

export const AvatarFallbackPrimitive = Component;
