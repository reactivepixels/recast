export type Viewports = Record<string, number>

export type RecastThemeProps = {
  modifier?: string | string[] | Record<string, string | string[]>
  size?: string | Record<string, string>
  variant?: string | Record<string, string>
  themekey?: string
  options?: RecastClientOptions
}

// Additional Recast configuration
export type RecastClientOptions = {
  viewports?: Viewports
  delay?: number
}

/**
 * Recast Theme wrapper types
 */
export type SizeProps<S> = {
  size?: keyof S | (Record<"default", keyof S> & Record<string, keyof S>)
}

export type VariantProps<V> = {
  variant?: keyof V | (Record<"default", keyof V> & Record<string, keyof V>)
}

export type ModifierProps<M> = {
  modifier?:
    | keyof M
    | Array<keyof M>
    | (Record<"default", keyof M | Array<keyof M>> &
        Record<string, keyof M | Array<keyof M>>)
}

export type ComponentProps<P, S, V, M> = SizeProps<S> &
  VariantProps<V> &
  ModifierProps<M> &
  Omit<P, "size" | "variant" | "modifier">
