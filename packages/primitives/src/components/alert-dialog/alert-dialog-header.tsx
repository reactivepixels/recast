import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { RecastThemeProp } from "@rpxl/recast/core";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";

const DEFAULT_THEME_KEY = "alertDialogHeader";

type BaseTheme = RecastThemeProp<"root">;

export type Props = React.HTMLAttributes<HTMLDivElement> & RecastThemeProps;

const AlertDialogHeaderPrimitive = forwardRef<HTMLDivElement, Props>(
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
      <div ref={ref} className={cn(classes?.root, className)} {...props} />
    );
  },
);

AlertDialogHeaderPrimitive.displayName = "AlertDialogHeaderPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  AlertDialogHeaderPrimitive,
  DEFAULT_THEME_KEY,
);
