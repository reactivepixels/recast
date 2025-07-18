"use client";

import { recast, RecastWithClassNameProps } from "@rpxl/recast";
import React, { forwardRef, HTMLAttributes } from "react";

type SliderProps = HTMLAttributes<HTMLDivElement> &
  RecastWithClassNameProps<{
    root: string;
    track: string;
    range: string;
    thumb: string;
  }>;

const SliderPrimitive = forwardRef<HTMLDivElement, SliderProps>(
  ({ cls, children, ...props }, ref) => (
    <div ref={ref} className={cls?.root} {...props}>
      <div className={cls?.track}>
        <div className={cls?.range} style={{ width: "60%" }} />
        <div className={cls?.thumb} style={{ left: "60%" }} />
      </div>
      {children}
    </div>
  )
);

SliderPrimitive.displayName = "SliderPrimitive";

// Create individual style objects for different aspects of the slider
const sliderBaseStyles = recast.styles({
  base: {
    root: "relative flex w-full touch-none select-none items-center",
    track: "relative h-1.5 w-full grow  rounded-full bg-gray-200",
    range: "absolute h-full bg-gray-900 rounded-full",
    thumb:
      "block absolute z-10 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-gray-900 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  },
});

const sliderColorStyles = recast.styles({
  variants: {
    color: {
      blue: {
        tracks: "bg-blue-100",
        range: "bg-blue-500",
        thumb: "border-blue-500",
      },
      red: {
        track: "bg-red-100",
        range: "bg-red-500",
        thumb: "border-red-500",
      },
      green: {
        track: "bg-green-100",
        range: "bg-green-500",
        thumb: "border-green-500",
      },
    },
  },
});

const sliderSizeStyles = recast.styles({
  variants: {
    size: {
      sm: {
        root: "h-4",
        track: "h-1",
        thumb: "h-3 w-3",
      },
      md: {
        root: "h-5",
        track: "h-1.5",
        thumb: "h-4 w-4",
      },
      lg: {
        root: "h-6",
        track: "h-2",
        thumb: "h-5 w-5",
      },
    },
  },
  defaults: {
    variants: { size: "md" },
  },
});

const sliderStateStyles = recast.styles({
  modifiers: {
    disabled: {
      root: "opacity-50 cursor-not-allowed",
      thumb: "cursor-not-allowed",
    },
    focus: {
      thumb: "ring-2 ring-blue-500 ring-offset-2",
    },
  },
});

// Compose all the slider style objects together
export const ComposedSlider = recast.compose([
  sliderBaseStyles,
  sliderColorStyles,
  sliderSizeStyles,
  sliderStateStyles,
])(SliderPrimitive);
