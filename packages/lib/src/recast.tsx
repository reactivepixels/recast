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
  type RecastComponentProps = Omit<P, "variants" | "modifiers" | "rcx"> &
    ExtractModifierProps<typeof styles.modifiers> &
    ExtractVariantProps<typeof styles.variants>;

  type Props = RecastComponentProps & { className?: string };

  const ComponentWithThemedProps = forwardRef<React.ElementRef<typeof Component>, Props>((props, ref) => {
    const { className, ...restProps } = props as Props;

    // Get keys of all modifier props and construct a `modifier` array
    const modifierKeys = Object.keys(styles.modifiers || {});
    const modifierProps = modifierKeys.filter((x) => {
      const key = x as keyof typeof restProps;
      return key in restProps && restProps[key] !== undefined && restProps[key] !== false;
    });

    // Get keys of all variant props and construct a `variants` object
    const variantKeys = Object.keys(styles.variants || {});
    const variantProps = variantKeys.reduce<{ [key: string]: unknown }>((acc, curr) => {
      if (curr in restProps && restProps[curr as keyof typeof restProps] !== undefined) {
        acc[curr] = restProps[curr as keyof typeof restProps];
      }
      return acc;
    }, {});

    // Remove `modifierKeys` and `variantKeys` from props
    // to avoid passing them to the underlying component
    const propsWithoutModifiersAndVariants = omit(
      [...modifierKeys, ...variantKeys, "className"] as string[],
      restProps,
    );

    const { className: recastClassesClassName, rcx } = getRecastClasses({
      styles,
      variants: variantProps,
      modifiers: modifierProps,
    } as RecastClasses);

    const mergedClassNames = mergeFn
      ? mergeFn(recastClassesClassName, className)
      : recastClassesClassName.concat(" ", className || "");

    return (
      <Component
        ref={ref}
        className={mergedClassNames}
        {...(Object.keys(rcx).length > 0 && { rcx })}
        {...(propsWithoutModifiersAndVariants as P)}
      />
    );
  });

  ComponentWithThemedProps.displayName = Component.displayName;

  return ComponentWithThemedProps;
}
