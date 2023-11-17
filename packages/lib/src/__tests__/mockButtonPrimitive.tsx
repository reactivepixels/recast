import React, { ButtonHTMLAttributes, forwardRef } from "react";
import {
  RecastBaseTheme,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "../index.js";

type BaseTheme = RecastBaseTheme<"root">;

export type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  RecastThemeProps & {
    asChild?: boolean;
  };

const ButtonPrimitive = forwardRef<HTMLButtonElement, Props>(
  ({ themekey, variants, modifiers, ...props }, ref) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      variants,
      modifiers,
    });

    return <button className={classes?.root} ref={ref} {...props} />;
  },
);

ButtonPrimitive.displayName = "ButtonPrimitive";

export default createRecastComponent<Props, BaseTheme>(ButtonPrimitive);
