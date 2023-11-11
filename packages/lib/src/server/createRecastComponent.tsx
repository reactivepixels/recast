import React, { forwardRef } from "react";
import { setTheme } from "../core/recastThemeInstance.js";
import { omit } from "../core/utils/omit.js";
import { validateRecastStyles } from "../core/validateRecastStyles.js";
import type { ComponentProps, RecastServerOptions } from "../server/types.js";
import type {
  MaybeSize,
  MaybeVariant,
  Modifier,
  RecastStyles,
  Size,
  Variant,
} from "../core/types.js";

export const createRecastComponent = <P, BaseTheme>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any,
  // Component: React.ComponentType<P>,
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
  >(
    displayName: D,
    styles: RecastStyles<BaseTheme, S, V, M>,
    options?: RecastServerOptions,
  ) {
    setTheme(styles?.themekey || key, styles);

    type Props = Omit<
      Extract<ComponentProps<P, S, V, M>, P>,
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
