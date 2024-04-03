import React, { ElementType, forwardRef } from "react";

type Props = React.SVGAttributes<SVGSVGElement> & {
  /** Typography html element override. */
  as?: ElementType;
};

const Component = forwardRef<SVGSVGElement, Props>(({ ...props }, ref) => {
  return <svg ref={ref} {...props} />;
});

Component.displayName = "IconPrimitive";

export const IconPrimitive = Component;
