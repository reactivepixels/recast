import React, { forwardRef } from "react";
import { setTheme } from "../core/recastThemeInstance";
import { validateRecastStyles } from "../core/validateRecastStyles";
import { omit } from "../core/utils/omit";
import type {
  Breakpoints,
  MaybeBreakpoints,
  ComponentProps,
  RecastClientOptionsTyped,
} from "../client/types";
import type {
  MaybeSize,
  MaybeVariant,
  Modifier,
  RecastStyles,
  Size,
  Variant,
} from "../core/types";

export const createRecastComponent = <P, BaseTheme>(
  Component: React.ComponentType<P>,
  key: string,
) => {
  /**
   * Returns an enhanced primitive component that is decorated with dynamic style props.
   *
   * @param displayName - Display name for component
   * @param styles - A styles object that conforms to the components `BaseTheme` API
   */
  function WrappedComponent<
    D extends string,
    S extends Size<BaseTheme, S>,
    V extends Variant<BaseTheme, V, S>,
    M extends Modifier<BaseTheme, M, S, V>,
    B extends Breakpoints<B>,
  >(
    displayName: D,
    styles: RecastStyles<BaseTheme, S, V, M>,
    options?: RecastClientOptionsTyped<B>,
  ) {
    setTheme(styles?.themekey || key, styles);

    type Props = Omit<
      Extract<ComponentProps<P, S, V, M, MaybeBreakpoints<B>>, P>,
      MaybeSize<S> | MaybeVariant<V>
    > &
      Partial<Record<keyof M, boolean>>;

    const ComponentWithThemedProps = forwardRef<
      React.ElementRef<typeof Component>,
      Props
    >(
      (
        {
          ...props
        }: Omit<P, MaybeSize<S> | MaybeVariant<V>> &
          Partial<Record<keyof M, boolean>>,
        ref,
      ) => {
        const modifierKeys = Object.keys(styles.modifier || {}) as [keyof M];
        const modifierProps = modifierKeys.filter((x) => !!props[x]);

        return (
          <Component
            options={options}
            modifier={modifierProps.length ? modifierProps : undefined}
            themekey={styles?.themekey}
            ref={ref}
            {...(omit(modifierKeys as string[], props) as P)}
          />
        );
      },
    );

    if (process.env["NODE_ENV"] !== "production")
      ComponentWithThemedProps.displayName = displayName;

    return ComponentWithThemedProps;
  }

  return {
    recast: WrappedComponent,
    validate: validateRecastStyles<BaseTheme>(),
  };
};
