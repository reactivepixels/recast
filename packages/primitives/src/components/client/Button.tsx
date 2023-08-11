import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client"

import BaseButton, { DEFAULT_THEME_KEY, BaseTheme, Props } from "../base/Button"

export const ButtonPrimitive = createRecastComponent<
  Props<RecastThemeProps>,
  BaseTheme
>(BaseButton<RecastThemeProps>(useRecastClasses), DEFAULT_THEME_KEY)
