import {
  ExtractModifierProps,
  ExtractVariantProps,
  MergeFn,
  RecastProps,
  RecastStyles,
  RelaxedModifierProps,
  RelaxedStyles,
  RelaxedVariantProps,
} from "./types.js";
import React, { forwardRef } from "react";

import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit } from "./utils/omit.js";

type RecastClasses = {
  styles: RelaxedStyles;
  variants: RelaxedVariantProps;
  modifiers: RelaxedModifierProps;
};

export function recast<
  P extends RecastProps<P>,
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
>(Component: React.ComponentType<P>, styles: RecastStyles<V, M, Pick<P, "rcx">>, mergeFn?: MergeFn) {
  type Props = Omit<P, "variants" | "modifiers" | "rcx"> &
    ExtractModifierProps<typeof styles.modifiers> &
    ExtractVariantProps<typeof styles.variants>;

  const ComponentWithThemedProps = forwardRef<React.ElementRef<typeof Component>, Props & { className?: string }>(
    ({ ...props }, ref) => {
      // Get keys of all modifier props and construct a `modifier` array
      const modifierKeys = Object.keys(styles.modifiers || {}) as [keyof M];
      const modifierProps = modifierKeys.filter((x) => !!props[x]);

      // Get keys of all variant props and construct a `variants` object
      const variantKeys = Object.keys(styles.variants || {}) as [keyof V];
      const variantProps = variantKeys.reduce(
        (acc, curr) => ({
          ...acc,
          ...(props[curr] ? { [curr]: props[curr] } : {}),
        }),
        {} as { [K in keyof V]?: keyof V[K] },
      );

      // Remove `modifierKeys` and `variantKeys` from props
      // to avoid passing them to the underlying component
      const propsWithoutModifiersAndVariants = omit([...modifierKeys, ...variantKeys, "className"] as string[], props);

      const { classNames, rcx } = getRecastClasses({
        styles,
        variants: variantProps,
        modifiers: modifierProps,
      } as RecastClasses);

      const mergedClassNames = mergeFn
        ? mergeFn(classNames, props.className)
        : classNames.concat(" ", props.className || "");

      return (
        <Component ref={ref} className={mergedClassNames} rcx={rcx} {...(propsWithoutModifiersAndVariants as P)} />
      );
    },
  );

  ComponentWithThemedProps.displayName = Component.displayName;

  return ComponentWithThemedProps;
}
