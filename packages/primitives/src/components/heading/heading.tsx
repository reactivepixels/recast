import React, { ElementType, forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  /** Heading level override. */
  as?: ElementType<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  >;
};

const Component = forwardRef<HTMLHeadingElement, Props>(
  ({ as: Tag = "h1", ...props }, ref) => {
    return <Tag ref={ref} {...props} />;
  },
);

Component.displayName = "HeadingPrimitive";

export const HeadingPrimitive = Component;
