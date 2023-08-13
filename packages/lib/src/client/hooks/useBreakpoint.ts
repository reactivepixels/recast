import { useEffect, useMemo, useState } from "react"
import { debounce } from "../../core/utils/debounce"
import { Viewports } from "../types"

export const useBreakpoint = (
  viewports: Viewports,
  isResponsive = false,
  delay = 0
) => {
  const [innerWidth, setInnerWidth] = useState(0)
  const [state, setState] = useState({
    breakpoint: "default",
  })

  const viewportKeys = useMemo(
    () => Object.keys(viewports).sort((a, b) => viewports[a] - viewports[b]),
    [viewports]
  )

  useEffect(() => {
    function handleResize() {
      const getBreakpoint = (w: number) =>
        viewportKeys.reduce((acc, curr) => {
          if (w >= viewports[curr]) {
            return curr
          }

          return acc
        }, "default")

      const oldBreakpoint = getBreakpoint(innerWidth)
      const newBreakpoint = getBreakpoint(window.innerWidth)

      if (oldBreakpoint !== newBreakpoint) {
        setInnerWidth(window.innerWidth)
        setState({
          breakpoint: newBreakpoint,
        })
      }
    }

    if (isResponsive) {
      // debounce to improve performance
      const [debouncedHandleResize, clearTimeout] = debounce(
        handleResize,
        delay
      )

      // eslint-disable-next-line no-undef
      window.addEventListener("resize", debouncedHandleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // eslint-disable-next-line no-undef
      return () => {
        clearTimeout()
        window.removeEventListener("resize", debouncedHandleResize)
      }
    }
  }, [isResponsive, innerWidth, viewports, viewportKeys, delay])

  return state
}
