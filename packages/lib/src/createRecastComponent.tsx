import React, { forwardRef } from "react"
import { setTheme } from "./recastThemeInstance"
import { ComponentProps } from "./types"
import { omit } from "./utils/omit"

export const createRecastComponent = <P, BaseTheme>(
  Component: React.ComponentType<P>,
  key: string
) => {
  type RecastStyles<S, V, M> = {
    themekey?: string
    defaults?: Defaults<S, V>
    base?: BaseTheme
    size?: Size<S>
    variant?: Variant<V, S>
    modifier?: Modifier<M, S, V>
  }

  type Nullish = null | undefined

  type MaybeSize<S> = keyof S extends Nullish ? "size" : ""
  type MaybeVariant<V> = keyof V extends Nullish ? "variant" : ""

  type Defaults<S, V> = Omit<
    {
      size?: keyof S
      variant?: keyof V
    },
    MaybeSize<S> | MaybeVariant<V>
  >

  type Size<S> = keyof S extends Nullish
    ? Record<never, BaseTheme>
    : Record<keyof S, BaseTheme>

  type Variant<V, S> = keyof S extends Nullish
    ? Record<keyof V, BaseTheme>
    : Record<keyof V, BaseTheme | Partial<Record<keyof S, BaseTheme>>>

  type Modifier<M, S, V> = Record<
    keyof M,
    | BaseTheme
    | Partial<Record<keyof S, BaseTheme>>
    | Partial<Record<keyof V, BaseTheme>>
  >

  /**
   * Returns an enhanced primitive component that is decorated with dynamic style props.
   *
   * @param displayName - Display name for component
   * @param styles - A styles object that conforms to the components `BaseTheme` API
   */
  return <
    D extends string,
    S extends Size<S>,
    V extends Variant<V, S>,
    M extends Modifier<M, S, V>
  >(
    displayName: D,
    styles: RecastStyles<S, V, M>
  ) => {
    setTheme(styles?.themekey || key, styles)

    type Props = Omit<
      Extract<ComponentProps<P, S, V, M>, P>,
      MaybeSize<S> | MaybeVariant<V>
    > &
      Partial<Record<keyof M, boolean>>

    const ComponentWithThemedProps = forwardRef<
      React.ElementRef<typeof Component>,
      Props
    >(
      (
        {
          ...props
        }: Omit<P, MaybeSize<S> | MaybeVariant<V>> &
          Partial<Record<keyof M, boolean>>,
        ref
      ) => {
        const modifierKeys = Object.keys(styles.modifier || {}) as [keyof M]
        const modifierProps = modifierKeys.filter((x) => !!props[x])

        return (
          <Component
            modifier={modifierProps.length ? modifierProps : undefined}
            themekey={styles?.themekey}
            ref={ref}
            {...(omit(modifierKeys as string[], props) as P)}
          />
        )
      }
    )

    if (process.env["NODE_ENV"] !== "production")
      ComponentWithThemedProps.displayName = displayName

    return ComponentWithThemedProps
  }
}
