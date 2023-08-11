import React, { ElementType, forwardRef } from "react"
import classNames from "classnames"
import { RecastThemeProp } from "@rpxl/recast/core"
import type { RecastClasses, RecastThemeProps } from "../../types"

type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type HTMLAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>

export const DEFAULT_THEME_KEY = "button"
export type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"startIcon"> &
  RecastThemeProp<"endIcon">

export type Props<P> = HTMLButtonProps &
  HTMLAnchorProps &
  HTMLDivProps &
  P & {
    /**
     * Element placed before the label.
     */
    startIcon?: React.ReactNode
    /**
     * Element placed after the label.
     */
    endIcon?: React.ReactNode
    /**
     * Element type override. Can be useful if using button styles
     * within an anchor tag or a pseudo button `div`.
     * */
    as?: ElementType
  }

function BaseButton<T extends RecastThemeProps>(
  useRecastClasses: <K extends Record<string, string | string[]>>(
    props: RecastThemeProps
  ) => RecastClasses<K>
) {
  const ButtonPrimitive = forwardRef<
    HTMLButtonElement & HTMLAnchorElement & HTMLDivElement,
    Props<T>
  >(
    (
      {
        themekey = DEFAULT_THEME_KEY,
        as: Tag,
        startIcon,
        endIcon,
        size,
        variant,
        modifier,
        children,
        className,
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

      Tag = Tag || "button"

      return (
        <Tag
          className={classNames(classes?.root, className)}
          ref={ref}
          {...props}
        >
          {startIcon && <div className={classes?.startIcon}>{startIcon}</div>}
          {children}
          {endIcon && <div className={classes?.endIcon}>{endIcon}</div>}
        </Tag>
      )
    }
  )

  if (process.env["NODE_ENV"] !== "production")
    ButtonPrimitive.displayName = "ButtonPrimitive"

  return ButtonPrimitive
}

export default BaseButton
