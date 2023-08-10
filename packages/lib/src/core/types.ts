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

export type RecastThemeProp<P extends string> = Partial<
  Record<P, string | string[]>
>

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
