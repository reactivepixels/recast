import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/server"

import BaseCard, { DEFAULT_THEME_KEY, BaseTheme, Props } from "../base/Card.js"

export const CardPrimitive = createRecastComponent<
  Props<RecastThemeProps>,
  BaseTheme
>(BaseCard<RecastThemeProps>(useRecastClasses), DEFAULT_THEME_KEY)
