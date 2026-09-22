> [!IMPORTANT]
> ## This project is archived and no longer maintained
>
> Recast set out to separate the theme layer from a component's internals, so one set
> of primitives could be styled differently in every project without duplicating code.
> That problem is now well covered by other tools, so the repository is being retired
> rather than left to drift.
>
> **Maintained alternatives:**
>
> | Instead of Recast | Use |
> | --- | --- |
> | Variants, slots, conditional styles, class conflict resolution | [tailwind-variants](https://www.tailwind-variants.org/) |
> | The smallest possible variant helper | [class-variance-authority](https://cva.style/) |
> | Owning the component source in your own repo | [shadcn/ui](https://ui.shadcn.com/) |
>
> **A note on versions:** the last published release (`@rpxl/recast@5.0.2`, April 2025)
> predates the `recast.styles()` API redesign that landed on `main` afterwards. That
> redesign was never released to npm, so the code here and the code on npm differ.
>
> Both packages are deprecated on npm. Everything remains available under the MIT
> license if you want to read it, fork it, or lift ideas from it.

<img src="https://raw.githubusercontent.com/reactivepixels/recast/main/logo.svg" alt="Recast" width="167">

> Build components once. Use everywhere.

[![codecov](https://codecov.io/gh/reactivepixels/recast/graph/badge.svg?token=F21FH8HJ7D)](https://codecov.io/gh/reactivepixels/recast)
![build](https://github.com/reactivepixels/recast/actions/workflows/.github/workflows/ci.yml/badge.svg)
[![Version](https://badge.fury.io/js/@rpxl%2Frecast.svg)](https://badge.fury.io/js/@rpxl%2Frecast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rpxl/recast)](https://bundlephobia.com/package/@rpxl/recast@2.0.0)

## TL;DR

Recast is a fundamentally different approach to building React components to maximise reusability.

## What is Recast?

Recast is not just a collection of utilities; it is an approach/pattern to building **truly** reusable component primitives by abstracting the theme layer from the internal workings of a component.

The specific values that an Recast "primitive" can receive are not specified within the component, instead these are defined by wrapping the component with a styles definition that will form the theme API.

## Who is Recast for?

Recast is for any individual/team who wants to build a truly reusable component
library that can be used across projects without duplicating code purely for the
purposes of theming.

## Documentation

For full documentation, visit [here](https://reactivepixels.github.io/recast).
