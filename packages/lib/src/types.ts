// Used to define component BaseTheme
export type RecastBaseTheme<B extends string> = Partial<
  Record<B, string | string[]>
>;

export type RecastStyles<BaseTheme, V, M> = {
  defaults?: Defaults<V, M>;
  base?: BaseTheme;
  variants?: Variants<BaseTheme, V>;
  modifiers?: Modifiers<BaseTheme, M>;
  conditionals?: Conditionals<BaseTheme, V, M>;
};

export type Nullish = null | undefined;
export type MaybeVariants<V> = keyof V extends Nullish ? "variants" : "";

export type Defaults<V, M> = {
  variants?: Omit<{ [K in keyof V]?: keyof V[K] }, MaybeVariants<V>>;
  modifiers?: Array<keyof M>;
};

export type Variants<BaseTheme, V> = {
  [K in keyof V]: Partial<Record<keyof V[K], BaseTheme>>;
};

export type ExtractVariantProps<V> = V extends object
  ? {
      [K in keyof V]?: K extends string ? keyof V[K] : never;
    }
  : never;

export type Modifiers<BaseTheme, M> = Record<keyof M, BaseTheme>;
export type ExtractModifierProps<M> = Partial<Record<keyof M, boolean>>;

export type Conditional<BaseTheme, V, M> = {
  variants?: V extends object
    ? {
        [K in keyof V]?: K extends string
          ? keyof V[K] | Array<keyof V[K]>
          : never;
      }
    : never;
  modifiers?: keyof M | Array<keyof M>;
  classes: Partial<Record<keyof BaseTheme, string | string[]>>;
};

export type Conditionals<BaseTheme, V, M> = Conditional<BaseTheme, V, M>[];

/**
 * LOOSLEY TYPED
 */
export type ClassNameRecord = Record<string, string | string[]>;
export type RecastBaseStyles = Record<string, string | string[]>;

export type RecastConditionalProps = {
  variants?: Record<string, string | string[]>;
  modifiers?: string | string[];
  classes: Record<string, string | string[]>;
};

export type RecastThemeProps = {
  themekey?: string;
  variants?: Record<string, string>;
  modifiers?: string[];
};

export type Styles = {
  defaults?: {
    variants?: Record<string, string>;
    modifiers?: string[];
  };
  base?: RecastBaseStyles;
  variants?: Record<string, Record<string, Record<string, string | string[]>>>;
  modifiers?: Record<string, Record<string, string | string[]>>;
  conditionals?: Array<RecastConditionalProps>;
};
