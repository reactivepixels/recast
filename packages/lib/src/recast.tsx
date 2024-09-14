import React, { forwardRef } from "react";
import {
  RecastProps,
  RecastStyles,
  MergeFn,
  ExtractModifierProps,
  ExtractVariantProps,
  ResponsiveValue,
  RelaxedStyles,
  RelaxedVariantProps,
  RelaxedModifierProps,
} from "./types.js";
import { getRecastClasses } from "./utils/getRecastClasses.js";
import { omit } from "./utils/omit.js";

export function recast<
  P extends RecastProps<P>,
  V extends { [K in keyof V]: { [S in keyof V[K]]: string | string[] } },
  M extends { [K in keyof M]: string | string[] },
  B extends string = string,
>(Component: React.ComponentType<P>, styles: RecastStyles<V, M, Pick<P, "rcx">, B>, mergeFn?: MergeFn) {
  type Props = Omit<P, keyof ExtractVariantProps<V, B> | keyof ExtractModifierProps<M>> &
    ExtractVariantProps<V, B> &
    ExtractModifierProps<M> & { className?: string };

  const ComponentWithThemedProps = forwardRef<React.ElementRef<typeof Component>, Props>((props, ref) => {
    const { className, ...restProps } = props as Props;

    const modifierKeys = Object.keys(styles.modifiers || {});
    const modifierProps = modifierKeys.filter((x) => {
      const key = x as keyof typeof restProps;
      return key in restProps && restProps[key] !== undefined && restProps[key] !== false;
    });

    const variantKeys = Object.keys(styles.variants || {});
    const variantProps = variantKeys.reduce<RelaxedVariantProps>((acc, curr) => {
      if (curr in restProps && restProps[curr as keyof typeof restProps] !== undefined) {
        const value = restProps[curr as keyof typeof restProps];
        if (typeof value === "string" || (typeof value === "object" && value !== null)) {
          acc[curr] = value as ResponsiveValue<string>;
        }
      }
      return acc;
    }, {});

    const propsWithoutModifiersAndVariants = omit(
      [...modifierKeys, ...variantKeys, "className"] as string[],
      restProps,
    );

    const { className: recastClassesClassName, rcx } = getRecastClasses({
      styles: styles as RelaxedStyles,
      variants: variantProps,
      modifiers: modifierProps as RelaxedModifierProps,
    });

    const mergedClassName = mergeFn
      ? mergeFn(recastClassesClassName, className)
      : `${recastClassesClassName} ${className || ""}`.trim();

    return <Component {...(propsWithoutModifiersAndVariants as P)} ref={ref} className={mergedClassName} rcx={rcx} />;
  });

  ComponentWithThemedProps.displayName = `Recast(${Component.displayName || Component.name || "Component"})`;

  return ComponentWithThemedProps;
}
