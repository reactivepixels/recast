import { useCallback, useMemo } from "react"
import { RecastClientOptions } from "../types"
import { isObject } from "../../core/utils/isObject"
import { useBreakpoint } from "./useBreakpoint"
import { getTheme } from "../../core/recastThemeInstance"
import { Styles } from "../../core/types"
import { getSizeClasses } from "../../core/utils/getSizeClasses"
import { getVariantClasses } from "../../core/utils/getVariantClasses"
import { getModifierClasses } from "../../core/utils/getModifierClasses"
import { mergeClassNames } from "../../core/utils/mergeClassNames"
import { DEFAULT_RECAST_CLIENT_OPTIONS } from "../constants"

type RecastPropUnion =
  | string
  | string[]
  | Record<string, string | string[]>
  | undefined

type Props = {
  themekey?: string
  size?: string | Record<string, string>
  variant?: string | Record<string, string>
  modifier?: string | string[] | Record<string, string | string[]>
  options?: RecastClientOptions
}

type State<K> = Record<keyof K, string> | undefined

export const useRecastClasses = <K extends Record<string, string | string[]>>({
  themekey,
  size,
  variant,
  modifier,
  options,
}: Props) => {
  const { viewports = {}, delay = 0 } = {
    ...DEFAULT_RECAST_CLIENT_OPTIONS,
    ...options,
  }

  const viewportKeys = useMemo(
    () => Object.keys(viewports).sort((a, b) => viewports[a] - viewports[b]),
    [viewports]
  )

  const hasResponsiveStyles = useMemo(() => {
    const isResponsive = (x: RecastPropUnion) =>
      typeof x !== "string" && isObject(x)

    return isResponsive(size) || isResponsive(variant) || isResponsive(modifier)
  }, [size, variant, modifier])

  const { breakpoint } = useBreakpoint(viewports, hasResponsiveStyles, delay)

  const getResponsiveProp = useCallback(
    (prop: RecastPropUnion = {}, viewport: string) => {
      // Check if a responsive styles object
      if (
        typeof prop !== "string" &&
        typeof prop === "object" &&
        !Array.isArray(prop) &&
        prop !== null
      ) {
        // Check if component has responsive mapping that matches
        // viewport or else find the next closest one
        if (prop[viewport]) {
          return prop[viewport]
        } else {
          const reversedViewportKeys = viewportKeys.slice().reverse() // non mutative
          const currentViewPortIndex = reversedViewportKeys.findIndex(
            (k) => k === viewport
          )
          const filteredViewportKeys = reversedViewportKeys.slice(
            currentViewPortIndex + 1
          )
          const matchingViewport =
            filteredViewportKeys.find((x) => prop[x]) || "default"

          return prop[matchingViewport]
        }
      }
      return prop
    },
    [viewportKeys]
  )

  const handleResize = useCallback(() => {
    const theme = themekey ? getTheme()?.[themekey] : ({} as Styles)

    const sizeProp = getResponsiveProp(size, breakpoint)
    const variantProp = getResponsiveProp(variant, breakpoint)
    const sizes = getSizeClasses({
      prop: typeof sizeProp === "string" ? sizeProp : "",
      sizes: theme?.size,
      fallback: theme?.defaults?.size,
    })

    const variants = getVariantClasses({
      theme,
      size:
        typeof sizeProp === "string" ? sizeProp : "" || theme?.defaults?.size,
      prop: typeof variantProp === "string" ? variantProp : "",
      variants: theme?.variant,
      fallback: theme?.defaults?.variant,
    })

    const modifiers = getModifierClasses({
      theme,
      size:
        typeof sizeProp === "string" ? sizeProp : "" || theme?.defaults?.size,
      variant:
        typeof variantProp === "string"
          ? variantProp
          : "" || theme?.defaults?.variant,
      prop: getResponsiveProp(modifier, breakpoint),
      modifiers: theme?.modifier,
    })

    const classes = [theme?.base, sizes, variants, modifiers].reduce(
      (acc, curr) => {
        if (!!acc && !!curr) return mergeClassNames(acc, curr)

        return acc
      },
      {} as Record<string, string>
    )

    return classes
  }, [modifier, size, variant, themekey, breakpoint, getResponsiveProp])

  return handleResize() as State<K>
}
