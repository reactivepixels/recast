import * as RadixAvatarPrimitive from "@radix-ui/react-avatar";
import React, { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof RadixAvatarPrimitive.Root>;

const Component = forwardRef<
  React.ElementRef<typeof RadixAvatarPrimitive.Root>,
  Props
>(({ ...props }, ref) => {
  return <RadixAvatarPrimitive.Root ref={ref} {...props} />;
});

Component.displayName = "AvatarPrimitive";

export const AvatarPrimitive = Component;
