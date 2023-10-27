# Foundation

> Recast's underlying philosophy and principles

# Background

Building truly reusable component libraries is hard. Even the process of engineering a sensible button component can often result in an overwhelming explosion of props being introduced purely for the purposes of catering to the ever-growing and often organic nature of design requirements. `primary`, `secondary`, `tertiary`, `quaternary(?)`, `floating`, `loading`, short lived ‘snowflake’ variations... and the list goes on and that was just a subset of a possible button component API. The problem with this ever-growing list of theme related props is a lock-tight coupling with a brands design requirements making it often impossible to simply reuse components across different projects. There are also a growing number of design systems out there that try and standardise component theming by providing well documented theme APIs for you to customise and adapt to your own system. These systems (i.e. MUI.com) fall short in terms of extending there theme API for highly custom applications and you can also be left with a large amount of unused component properties as they have been baked into the system components but may not be required for yours.

# What is "Recast"

"Recast" is not just a set of reusable components it is an approach/pattern to building **truly** reusable component primitives by adhering to a set of core principles. Recast uses the "SVM" methodology - which requires all components to accept three properties: `size`, `variant` and `modifier`.

The **SVM** approach beleives that all themeing requirements can be achieved through a combination of these intrinsic primitive component props.

- **Size:** Used to specify component size variants i.e., “sm”, “md”, “lg”
- **Variant:** Distinct variations of a component i.e., “primary”, “secondary”, “tertiary”
- **Modifier**: Indiscrete variations of a component that can be “mixed-in” and combined.

> Variants & Modifiers can be configured to respect size e.g. different styles can be applied for a `small`, `medium` & `large` _modifiers_ and _variants_ if required.

The specific values that an Recast "primitive" can receive are not specified within the component but are defined by wrapping the component with a styles definition that will form theming API for a specific component.

### Basic Usage

The below example illustrates how to import an "Recast" primitive `Button` component and wrap it with some basic css styling properties that will form the components theme props API.

> Please note: example is using [Tailwind CSS](https://tailwindcss.com/) for class names but any css classes referencing a stylesheet or css modules could be used here.

```
import { ButtonPrimitive } from "./components/primitives/Button"

const Button = ButtonPrimitive.recast("Button", {
  defaults: { variant: "primary", size: "md" },
  base: {
    root: "cursor-pointer hover:bg-opacity-80",
  },
  variant: {
    primary: {
      root: "bg-green-500",
    },
    secondary: {
       root: "bg-blue-500",
    },
  },
  modifier: {
    block: {
      root: "w-full",
    },
    floating: {
      root: "shadow-lg",
    },
  },
  size: {
    sm: {
      root: "px-4 py-2 text-sm rounded-sm",
    },
    md: {
      root: "px-6 py-3 text-md rounded-md",
    },
    lg: {
      root: "px-4 py-2 text-lg rounded-lg",
    },
  },
})

export default Button
```

### Usage within Application

The example below illustrates how the Recast wrapped component now accepts **SVM** theme properties based on the style object that was passed in when configuring the component (example above). When used in conjunction with TypeScript you will also get type checking and completion for the values that are passed through to the **SVM** properties.

> Please note: any specified modifiers will be converted to `boolean` props and can be used in combination with other modifiers e.g. `floating` and `block`.

```
import Button from "../components/Button"

...

<Button variant="secondary" size="md" floating block>My Secondary Button</Button>

```

Using this approach will ensure you never have to concern yourself with writing another `Button` component again! 🤯 🌈 🦄.

# How is this different to other component libraries?

The SVM approach does not require you to prescribe to a predefined set of 'baked in' theming props or naming conventions. The specifics of how you choose to engineer a design system is completely within the control of the Design System Team engineers.
