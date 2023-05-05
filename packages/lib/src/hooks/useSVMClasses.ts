import { useCallback, useMemo } from "react"
import { getTheme } from "../svmThemeInstance"
import { getModifierClasses } from "../utils/getModifierClasses"
import { getSizeClasses } from "../utils/getSizeClasses"
import { getVariantClasses } from "../utils/getVariantClasses"
import { mergeThemeClassNames } from "../utils/mergeThemeClassNames"
import { Styles } from "../types"
import { useSVMContext } from "../svm"
import { isObject } from "../utils/isObject"
import { useBreakpoint } from "./useBreakpoint"
import mergeWith from "lodash.mergewith"

type Props = {
  themekey?: string
  size?: string | Record<string, string>
  variant?: string | Record<string, string>
  modifier?: string | string[] | Record<string, string | string[]>
}

type State<K> = Record<keyof K, string> | undefined

export const useSVMClasses = <K extends Record<string, string | string[]>>({
  themekey,
  size,
  variant,
  modifier,
}: Props) => {
  const { viewports, delay } = useSVMContext()

  const viewportKeys = useMemo(
    () => Object.keys(viewports).sort((a, b) => viewports[a] - viewports[b]),
    [viewports]
  )

  const hasResponsiveStyles = useMemo(() => {
    const isResponsive = (x: any) => typeof x !== "string" && isObject(x)

    return isResponsive(size) || isResponsive(variant) || isResponsive(modifier)
  }, [size, variant, modifier])

  const { breakpoint } = useBreakpoint(viewports, hasResponsiveStyles, delay)

  const getResponsiveProp = useCallback(
    (prop: any, viewport: string) => {
      // Check if a responsive styles object
      if (typeof prop !== "string" && isObject(prop)) {
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
      // If not responsive just return the prop as is
      return prop
    },
    [viewportKeys]
  )

  const handleResize = useCallback(() => {
    const theme = themekey ? getTheme()?.[themekey] : ({} as Styles)

    const sizes = getSizeClasses({
      prop: getResponsiveProp(size, breakpoint),
      sizes: theme?.size,
      fallback: theme?.defaults?.size,
    })

    const variants = getVariantClasses({
      theme,
      size: getResponsiveProp(size, breakpoint) || theme?.defaults?.size,
      prop: getResponsiveProp(variant, breakpoint),
      variants: theme?.variant,
      fallback: theme?.defaults?.variant,
    })

    const modifiers = getModifierClasses({
      theme,
      size: getResponsiveProp(size, breakpoint) || theme?.defaults?.size,
      variant:
        getResponsiveProp(variant, breakpoint) || theme?.defaults?.variant,
      prop: getResponsiveProp(modifier, breakpoint),
      modifiers: theme?.modifier,
    })

    const classes = [theme?.base, sizes, variants, modifiers].reduce(
      (acc, curr) => {
        return mergeWith(acc, curr, mergeThemeClassNames)
      },
      {} as Record<string, string>
    )

    return classes
  }, [modifier, size, variant, themekey, breakpoint, getResponsiveProp])

  return handleResize() as State<K>
}
