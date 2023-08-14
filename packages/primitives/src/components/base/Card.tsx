import React, { ElementType, forwardRef } from "react"
import classNames from "classnames"
import { RecastThemeProp } from "@rpxl/recast/core"
import type { RecastClasses, RecastThemeProps } from "../../types"

export const DEFAULT_THEME_KEY = "card"
export type BaseTheme = RecastThemeProp<"root">

export type Props<P> = React.HTMLAttributes<HTMLElement> &
  P & {
    /** HTML element override. */
    as?: ElementType
  }

function BaseCard<T extends RecastThemeProps>(
  useRecastClasses: <K extends Record<string, string | string[]>>(
    props: RecastThemeProps
  ) => RecastClasses<K>
) {
  const CardPrimitive = forwardRef<HTMLElement, Props<T>>(
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

  return CardPrimitive
}

export default BaseCard
