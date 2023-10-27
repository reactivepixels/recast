import React, { ElementType, PropsWithChildren, forwardRef } from "react";
import clsx from "clsx";
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client";
import { RecastThemeProp } from "@rpxl/recast/core";
import { AriaButtonOptions, useButton } from "react-aria";
import { useMergedRef } from "../utils/useMergedRef";

const DEFAULT_THEME_KEY = "button";

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"startEl"> &
  RecastThemeProp<"endEl">;

type Props = PropsWithChildren<
  RecastThemeProps &
    AriaButtonOptions<"button"> & {
      /**
       * Element placed before the label.
       */
      startEl?: React.ReactNode;
      /**
       * Element placed after the label.
       */
      endEl?: React.ReactNode;
      /**
       * Element type override. Can be useful if using button styles
       * within an anchor tag or a pseudo button `div`.
       * */
      as?: ElementType;
      /**
       * Additional css classes to merge
       */
      className?: string;
    }
>;

const ButtonPrimitive = forwardRef<HTMLElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      as: Tag = "button",
      startEl,
      endEl,
      size,
      variant,
      modifier,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const elementRef = useMergedRef([ref]);

    const { buttonProps } = useButton(
      { ...(props as AriaButtonOptions<typeof Tag>), elementType: Tag },
      elementRef,
    );

    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    });

    return (
      <Tag
        className={clsx(classes?.root, className)}
        ref={elementRef}
        {...buttonProps}
      >
        {startEl && <div className={classes?.startEl}>{startEl}</div>}
        {children}
        {endEl && <div className={classes?.endEl}>{endEl}</div>}
      </Tag>
    );
  },
);

if (process.env["NODE_ENV"] !== "production")
  ButtonPrimitive.displayName = "ButtonPrimitive";

export default createRecastComponent<Props, BaseTheme>(
  ButtonPrimitive,
  DEFAULT_THEME_KEY,
);
