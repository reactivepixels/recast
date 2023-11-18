<img src="https://raw.githubusercontent.com/reactivepixels/recast/main/logo.svg" alt="Recast" width="167">

> Build components once. Use everywhere.

[![codecov](https://codecov.io/gh/reactivepixels/recast/graph/badge.svg?token=F21FH8HJ7D)](https://codecov.io/gh/reactivepixels/recast)
![build](https://github.com/reactivepixels/recast/actions/workflows/.github/workflows/ci.yml/badge.svg)
[![Version](https://badge.fury.io/js/@rpxl%2Frecast.svg)](https://badge.fury.io/js/@rpxl%2Frecast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<!-- ![npm bundle size](https://img.shields.io/bundlephobia/min/@rpxl/recast) -->

## TL;DR

Recast is a fundamentally different approach to building React components to maximise reusability.

## What is Recast?

Recast is not just a collection of utilities; it is an approach/pattern to building **truly** reusable component primitives by abstracting the theme layer from the internal workings of a component.

The specific values that an Recast "primitive" can receive are not specified within the component, instead these are defined by wrapping the component with a styles definition that will form the theme API.

## Features

### Tailwind friendly

Recast works seamlessly with CSS frameworks like Tailwind CSS, or use any flavour of css you like.

### TypeScript at its core

Recast is brought to you courtesy of TypeScript. Types are what make all this possible.

### Tiny

At only 1.9kb gzipped and zero dependencies, Recast packs a big punch for such a small utility library.

### No more prop bloat

Define your own component theme API. Include only the props you need and nothing more. Kitchen sink not included!
