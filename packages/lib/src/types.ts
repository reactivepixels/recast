/**
 * Recast utility types
 */
export type ClassNameRecord = Record<string, string | string[]>;
export type MergeFn = (classes: string | string[], className?: string) => string;
export type Nullish = null | undefined;

export type Leaves<T> = {
  [K in keyof T]: T[K];
}[keyof T];

export type RecastWithClassNameProps<Props extends { [K in keyof Props]: string }> = {
  /** Recast class object properties */
  rcx?: { [P in keyof Props]?: string };
};

/*
 * Strongly typed Recast generic types
 */

export type MaybeVariants<V> = keyof V extends Nullish ? "variants" : "";
export type ExtractModifierProps<M> = { [K in keyof M]?: boolean };
export type ExtractVariantProps<V> = V extends object
  ? {
      [K in keyof V]?: K extends string ? keyof V[K] : never;
    }
  : never;

export type RecastProps<T> =
  Leaves<T> extends Nullish
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any // TODO: Could be improved if we can do a check for `Nullish` type on `RecastStyles` generic type
    : {
        rcx?: Leaves<T>;
      };

export type RecastStyles<V, M, P> = {
  /** Default values for variants and modifiers */
  defaults?: {
    /** Variants stuff */
    variants?: Omit<{ [K in keyof V]?: keyof V[K] }, MaybeVariants<V>>;
    /** Modifier stuff */
    modifiers?: (keyof M)[];
  };
  /**
   * Base style properties
   * These will be applied.
   */
  base?: keyof NonNullable<Leaves<P>> extends Nullish
    ? string | string[]
    :
        | string
        | string[]
        | {
            [K in keyof NonNullable<Leaves<P>>]: string | string[];
          };

  /** Yadda yadda */
  variants?: {
    [K in keyof V]: Record<
      keyof V[K],
      keyof NonNullable<Leaves<P>> extends Nullish
        ? string | string[]
        :
            | string
            | string[]
            | {
                [K in keyof NonNullable<Leaves<P>>]: string | string[];
              }
    >;
  };

  modifiers?: {
    [K in keyof M]: keyof NonNullable<Leaves<P>> extends Nullish
      ? string | string[]
      :
          | string
          | string[]
          | {
              [K in keyof NonNullable<Leaves<P>>]: string | string[];
            };
  };

  conditionals?: {
    variants?: V extends object
      ? {
          [K in keyof V]?: K extends string ? keyof V[K] | Array<keyof V[K]> : never;
        }
      : never;
    modifiers?: keyof M | (keyof M)[];
    classNames: keyof NonNullable<Leaves<P>> extends Nullish
      ? string | string[]
      :
          | string
          | string[]
          | {
              [K in keyof NonNullable<Leaves<P>>]: string | string[];
            };
  }[];
};

/**
 * Loosley typed for usage as arguments to different utility methods
 */
export type RelaxedStyles = {
  defaults?: RelaxedDefaults;
  base?: RelaxedBase;
  variants?: Record<string, Record<string, string | string[] | Record<string, string | string[]>>>;
  modifiers?: Record<string, string | string[] | Record<string, string | string[]>>;
  conditionals?: RelaxedCondiiton[];
};

export type RelaxedDefaults = { variants?: Record<string, string>; modifiers?: string[] };
export type RelaxedBase = string | string[] | Record<string, string | string[]>;

export type RelaxedCondiiton = {
  variants?: Record<string, string | string[]>;
  modifiers?: string | string[];
  classNames: string | string[] | Record<string, string | string[]>;
};

export type RelaxedRecastStyleProps = {
  classNames: string;
  rcx: ClassNameRecord;
};

export type RelaxedVariantProps = Record<string, string>;
export type RelaxedModifierProps = string[];
