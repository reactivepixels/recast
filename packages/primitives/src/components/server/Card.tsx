import React, { ElementType, forwardRef } from "react"
import classNames from "classnames"
import {
  RecastThemeProps,
  useRecastClasses,
  createRecastComponent,
  RecastThemeProp,
} from "@rpxl/recast/server"

const DEFAULT_THEME_KEY = "card"

type BaseTheme = RecastThemeProp<"root">

type Props = React.HTMLAttributes<HTMLElement> &
  RecastThemeProps & {
    /** HTML element override. */
    as?: ElementType
  }

/** Card element */
const CardPrimitive = forwardRef<HTMLElement, Props>(
  (
    {
      themekey = DEFAULT_THEME_KEY,
      as: Tag = "div",
      children,
      className,
      size,
      variant,
      modifier,
      ...props
    },
    ref
  ) => {
    const classes = useRecastClasses<BaseTheme>({
      themekey,
      size,
      variant,
      modifier,
    })

    return (
      <Tag
        className={classNames(classes?.root, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

if (process.env["NODE_ENV"] !== "production")
  CardPrimitive.displayName = "CardPrimitive"

export const Card = createRecastComponent<
  React.ComponentPropsWithRef<typeof CardPrimitive>,
  BaseTheme
>(CardPrimitive, DEFAULT_THEME_KEY)
