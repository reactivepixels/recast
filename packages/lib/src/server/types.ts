export type RecastThemeProps = {
  modifier?: string | string[]
  size?: string
  variant?: string
  themekey?: string
}

/**
 * Recast Theme wrapper types
 */
export type SizeProps<S> = {
  size?: keyof S
}

export type VariantProps<V> = {
  variant?: keyof V
}

export type ModifierProps<M> = {
  modifier?: keyof M | Array<keyof M>
}

export type ComponentProps<P, S, V, M> = SizeProps<S> &
  VariantProps<V> &
  ModifierProps<M> &
  Omit<P, "size" | "variant" | "modifier">
