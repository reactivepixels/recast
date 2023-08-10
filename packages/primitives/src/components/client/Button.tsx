import React, { ElementType, forwardRef } from "react"
import classNames from "classnames"
import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
  RecastThemeProp,
} from "@rpxl/recast/client"

const DEFAULT_THEME_KEY = "button"

type BaseTheme = RecastThemeProp<"root"> &
  RecastThemeProp<"startIcon"> &
  RecastThemeProp<"endIcon">

type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type HTMLAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = HTMLButtonProps &
  HTMLAnchorProps &
  HTMLDivProps &
  RecastThemeProps & {
    /**
     * Element placed before the label.
     */
    startIcon?: React.ReactNode // TODO - change to `startElement`
    /**
     * Element placed after the label.
     */
    endIcon?: React.ReactNode // TODO - change to `endElement`
    /**
     * Element type override. Can be useful if using button styles
     * within an anchor tag or a pseudo button `div`.
     * */
    as?: ElementType
  }

/**
 * Button Element
 */
const ButtonPrimitive = forwardRef<
  HTMLButtonElement & HTMLAnchorElement & HTMLDivElement,
  Props
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
      options,
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
      options,
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

export const Button = createRecastComponent<Props, BaseTheme>(
  ButtonPrimitive,
  DEFAULT_THEME_KEY
)
