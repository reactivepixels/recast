import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/server"

import CardPrimitive, {
  DEFAULT_THEME_KEY,
  BaseTheme,
  Props,
} from "../base/Card"

export const Card = createRecastComponent<Props<RecastThemeProps>, BaseTheme>(
  CardPrimitive<RecastThemeProps>(useRecastClasses),
  DEFAULT_THEME_KEY
)
