export type RecastThemeProps = {
  modifier?: string | string[] | Record<string, string | string[]>
  size?: string | Record<string, string>
  variant?: string | Record<string, string>
  themekey?: string
  viewports?: Record<string, number>
}

/** Loosley typed component styles object shape */
export type Styles = {
  themekey?: string
  defaults?: Record<"size" | "variant", string>
  base?: Record<string, Record<string, string | string[]>>
  size?: Record<string, Record<string, string | string[]>>
  variant?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >
  modifier?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >
}

/**
 * Default theme types
 */
export type Base<B> = Record<keyof B, Record<string, string | string[]>>
export type Sizes<S> = Record<keyof S, Record<string, string | string[]>>

export type Variants<V> = Record<
  keyof V,
  Record<string, string | string[] | Record<string, string | string[]>>
>

export type Modifiers<M> = Record<
  keyof M,
  Record<string, string | string[] | Record<string, string | string[]>>
>

export type Theme<B, S, V, M> = {
  defaults?: { size?: string; variant?: string }
  base?: Base<B>
  size?: Sizes<S>
  variant?: Variants<V>
  modifier?: Modifiers<M>
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
