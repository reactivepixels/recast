import {
  useRecastClasses,
  createRecastComponent,
  RecastThemeProps,
} from "@rpxl/recast/client"

import ButtonPrimitive, {
  DEFAULT_THEME_KEY,
  BaseTheme,
  Props,
} from "../base/Button"

export const Button = createRecastComponent<Props<RecastThemeProps>, BaseTheme>(
  ButtonPrimitive<RecastThemeProps>(useRecastClasses),
  DEFAULT_THEME_KEY
)
