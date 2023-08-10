import { RecastThemeProps as RecastClientThemeProps } from "@rpxl/recast/client"
import { RecastThemeProps as RecastServerThemeProps } from "@rpxl/recast/server"

export type RecastClasses<K> = Record<keyof K, string> | undefined
export type RecastThemeProps = Omit<
  RecastClientThemeProps | RecastServerThemeProps,
  "size" | "variant" | "modifier"
> &
  // Very difficult to determine types here conditionally
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<Record<"size", any>> &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<Record<"variant", any>> &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Partial<Record<"modifier", any>>
