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

export type Breakpoints<B> = Record<keyof B, number>

export type MaybeBreakpoints<B> = Record<
  keyof B extends never
    ? keyof { sm: number; md: number; lg: number; xl: number }
    : keyof B,
  number
>

export type RecastClientOptionsTyped<B> = {
  viewports?: Breakpoints<B>
  delay?: number
}

/**
 * Recast Theme wrapper types
 */
export type SizeProps<S, B> = {
  size?:
    | keyof S
    | (Record<"default", keyof S> & Partial<Record<keyof B, keyof S>>)
}

export type VariantProps<V, B> = {
  variant?:
    | keyof V
    | (Record<"default", keyof V> & Partial<Record<keyof B, keyof V>>)
}

export type ModifierProps<M, B> = {
  modifier?:
    | keyof M
    | Array<keyof M>
    | (Record<"default", keyof M | Array<keyof M>> &
        Partial<Record<keyof B, keyof M | Array<keyof M>>>)
}

export type ComponentProps<P, S, V, M, B> = SizeProps<S, B> &
  VariantProps<V, B> &
  ModifierProps<M, B> &
  Omit<P, "size" | "variant" | "modifier">
