/** Loosley typed component styles object shape */
export type Styles = {
  themekey?: string;
  defaults?: Record<"size" | "variant", string>;
  base?: Record<string, Record<string, string | string[]>>;
  size?: Record<string, Record<string, string | string[]>>;
  variant?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >;
  modifier?: Record<
    string,
    Record<string, string | string[] | Record<string, string | string[]>>
  >;
};

export type RecastThemeProp<P extends string> = Partial<
  Record<P, string | string[]>
>;

/**
 * Default theme types
 */
export type Base<B> = Record<keyof B, Record<string, string | string[]>>;
export type Sizes<S> = Record<keyof S, Record<string, string | string[]>>;

export type Variants<V> = Record<
  keyof V,
  Record<string, string | string[] | Record<string, string | string[]>>
>;

export type Modifiers<M> = Record<
  keyof M,
  Record<string, string | string[] | Record<string, string | string[]>>
>;

export type Theme<B, S, V, M> = {
  defaults?: { size?: string; variant?: string };
  base?: Base<B>;
  size?: Sizes<S>;
  variant?: Variants<V>;
  modifier?: Modifiers<M>;
};

// Create Recast Component
export type RecastStyles<BaseTheme, S, V, M> = {
  themekey?: string;
  defaults?: Defaults<S, V>;
  base?: BaseTheme;
  size?: Size<BaseTheme, S>;
  variant?: Variant<BaseTheme, V, S>;
  modifier?: Modifier<BaseTheme, M, S, V>;
};

export type Nullish = null | undefined;
export type MaybeSize<S> = keyof S extends Nullish ? "size" : "";
export type MaybeVariant<V> = keyof V extends Nullish ? "variant" : "";

export type Defaults<S, V> = Omit<
  {
    size?: keyof S;
    variant?: keyof V;
  },
  MaybeSize<S> | MaybeVariant<V>
>;

export type Size<BaseTheme, S> = keyof S extends Nullish
  ? Record<never, BaseTheme>
  : Record<keyof S, BaseTheme>;

export type Variant<BaseTheme, V, S> = keyof S extends Nullish
  ? Record<keyof V, BaseTheme>
  : Record<keyof V, BaseTheme | Partial<Record<keyof S, BaseTheme>>>;

export type Modifier<BaseTheme, M, S, V> = Record<
  keyof M,
  | BaseTheme
  | Partial<Record<keyof S, BaseTheme>>
  | Partial<Record<keyof V, BaseTheme>>
>;
