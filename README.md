<img src="logo.svg" alt="Recast" width="167">

> Build components once. Use everywhere.

[![codecov](https://codecov.io/gh/reactivepixels/recast/graph/badge.svg?token=F21FH8HJ7D)](https://codecov.io/gh/reactivepixels/recast)
![build](https://github.com/reactivepixels/recast/actions/workflows/.github/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## TL;DR

Recast is a fundamentally different approach to building React components to maximise reusability.

## What is Recast?

Recast is a collection of utilities that enable you to build truly reusable component primitives.

By following the "SVM" methodology - Recast enables you to achieve all your component theming requirements through a combination of three intrinsic component properties: `size`, `variant` and `modifier` a.k.a. SVM.

This means that your component primitives are completely decoupled from the theme layer and can be reused over and over again without ever worrying about trying to achieve the impractical ‘one-size-fits-all’ approach of baking in all possible theme variations as props.

## Features

### Responsive

All size, variant and modifier props are responsive and can be conditionally applied using breakpoints you define.

### Tailwind friendly

Recast works seamlessly with CSS frameworks like Tailwind CSS, or use any flavour of css you like.

### TypeScript at its core

Recast is brought to you courtesy of TypeScript. Types are what make all this possible.

### Tiny

At only 1.9kb gzipped and zero dependencies, Recast packs a big punch for such a small utility library.

### No more prop bloat

Define your own component theme API. Include only the props you need and nothing more. Kitchen sink not included!
