import React, { forwardRef } from "react";
import { setTheme } from "./recastThemeInstance.js";
import { generateRandomId } from "./utils/generateRandomId.js";
import { omit } from "./utils/omit.js";
import { validateRecastStyles } from "./validateRecastStyles.js";
import type {
  Variants,
  Modifiers,
  RecastStyles,
  ExtractVariantProps,
  ExtractModifierProps,
} from "./types.js";

export const createRecastComponent = <P, BaseTheme>(
  Component: React.ComponentType<P>,
) => {
  function WrappedComponent<
    V extends Variants<BaseTheme, V>,
    M extends Modifiers<BaseTheme, M>,
  >(styles: RecastStyles<BaseTheme, V, M>) {
    type Props = Omit<P, "variants" | "modifiers" | "themekey"> &
      ExtractModifierProps<M> &
      ExtractVariantProps<typeof styles.variants>;

    const themeKey = generateRandomId(12);
    setTheme(themeKey, styles);

    const ComponentWithThemedProps = forwardRef<
      React.ElementRef<typeof Component>,
      Props
    >(({ ...props }, ref) => {
      // Get keys of all modifier props and construct
      // a `modifier` array to pass through to component
      const modifierKeys = Object.keys(styles.modifiers || {}) as [keyof M];
      const modifierProps = modifierKeys.filter((x) => !!props[x]);

      // Get keys of all variant props and construct
      // a `variants` object to pass through to component
      const variantKeys = Object.keys(styles.variants || {}) as [keyof V];
      const variantProps = variantKeys.reduce(
        (acc, curr) => ({
          ...acc,
          ...(props[curr] ? { [curr]: props[curr] } : {}),
        }),
        {},
      );

      // Remove `modifierKeys` and `variantKeys` from props
      // to avoid passing them to the underlying component
      const propsWithoutModifiersAndVariants = omit(
        [...modifierKeys, ...variantKeys] as string[],
        props,
      );

      return (
        <Component
          modifiers={modifierProps}
          variants={variantProps}
          themekey={themeKey}
          ref={ref}
          {...(propsWithoutModifiersAndVariants as P)}
        />
      );
    });

    ComponentWithThemedProps.displayName = Component.displayName;

    return ComponentWithThemedProps;
  }

  return {
    recast: WrappedComponent,
    validate: validateRecastStyles<BaseTheme>(),
  };
};
