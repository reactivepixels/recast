import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { recast } from "../recast.js";
import type { RecastWithClassNameProps } from "../types.js";
import { cn } from "../utils/cn.js";

describe("recast function", () => {
  // Basic component for testing
  const BaseButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }
  >(({ className, children, ...props }, ref) => (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  ));

  BaseButton.displayName = "BaseButton";

  describe("basic functionality", () => {
    it("should handle undefined className in mergeProps", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
      });

      const { container } = render(<Button className={undefined}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base");
    });

    it("should create a component with base styles", () => {
      const Button = recast(BaseButton, {
        base: "text-base font-normal",
      });

      const { container } = render(<Button>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base font-normal");
    });

    it("should apply variant styles correctly", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
          color: {
            primary: "bg-blue-500",
            secondary: "bg-gray-500",
          },
        },
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(
        <Button size="lg" color="primary">
          Test
        </Button>,
      );

      expect(container.firstChild).toHaveClass("text-base text-lg bg-blue-500");
    });

    it("should apply modifier styles correctly", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
          active: "ring-2 ring-blue-500",
        },
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(
        <Button disabled active>
          Test
        </Button>,
      );

      expect(container.firstChild).toHaveClass("text-base opacity-50 cursor-not-allowed ring-2 ring-blue-500");
    });
  });

  describe("responsive styling", () => {
    it("should handle responsive styles", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(<Button size={{ default: "sm", md: "lg" }}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base text-sm md:text-lg");
    });

    it("should apply conditional styles", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
          color: {
            primary: "bg-blue-500",
            secondary: "bg-gray-500",
          },
        },

        conditionals: [
          {
            variants: { size: "lg", color: "primary" },
            className: "font-bold",
          },
        ],
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(
        <Button size="lg" color="primary">
          Test
        </Button>,
      );

      expect(container.firstChild).toHaveClass("text-base text-lg bg-blue-500 font-bold");
    });

    it("should handle complex combinations of styles, including conditionals without breakpoint prefixes", () => {
      const Button = recast(BaseButton, {
        base: "text-base rounded",
        variants: {
          size: {
            sm: "text-sm py-1 px-2",
            md: "text-base py-2 px-4",
            lg: "text-lg py-3 px-6",
          },
          color: {
            primary: "bg-blue-500 text-white",
            secondary: "bg-gray-500 text-white",
            ghost: "bg-transparent text-current",
          },
        },
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
          loading: "animate-pulse",
        },
        conditionals: [
          {
            variants: { size: "lg", color: "primary" },
            className: "uppercase tracking-wide",
          },
          {
            modifiers: ["disabled", "loading"],
            className: "pointer-events-none",
          },
        ],
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(
        <Button size={{ default: "sm", md: "lg" }} color={{ default: "ghost", lg: "primary" }} disabled loading>
          Test
        </Button>,
      );

      // Note: Conditional classes (uppercase, tracking-wide) are applied without breakpoint prefixes.
      // This is the expected behavior as conditional classes are based on variant values, not breakpoints.
      expect(container.firstChild).toHaveClass(
        "text-base rounded text-sm py-1 px-2 md:text-lg md:py-3 md:px-6 " +
          "bg-transparent text-current lg:bg-blue-500 lg:text-white " +
          "opacity-50 cursor-not-allowed animate-pulse " +
          "uppercase tracking-wide pointer-events-none",
      );
    });

    it("should apply conditional styles correctly when multiple variants are specified", () => {
      const Button = recast(BaseButton, {
        base: "text-base rounded",
        variants: {
          size: {
            sm: "text-sm py-1 px-2",
            md: "text-base py-2 px-4",
            lg: "text-lg py-3 px-6",
          },
          color: {
            primary: "bg-blue-500 text-white",
            secondary: "bg-gray-500 text-white",
            ghost: "bg-transparent text-current",
          },
        },
        conditionals: [
          {
            variants: { size: ["md", "lg"], color: ["ghost", "primary"] },
            className: "uppercase tracking-wide",
          },
        ],
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(
        <Button size={{ default: "sm", md: "lg", xl: "lg" }} color={{ default: "ghost", lg: "primary" }}>
          Test
        </Button>,
      );

      // At default breakpoint: size is "sm", color is "ghost" - conditional should not apply
      expect(container.firstChild).toHaveClass("text-base rounded text-sm py-1 px-2 bg-transparent text-current");
      expect(container.firstChild).toHaveClass("uppercase tracking-wide");

      // At md breakpoint: size is "lg", color is "ghost" - conditional should apply
      expect(container.firstChild).toHaveClass("md:text-lg md:py-3 md:px-6 uppercase tracking-wide");

      // At lg breakpoint: size is "lg", color is "primary" - conditional should apply
      expect(container.firstChild).toHaveClass("lg:bg-blue-500 lg:text-white uppercase tracking-wide");

      // Note: Conditional classes (uppercase, tracking-wide) are applied without breakpoint prefixes
      // and are present if the condition is met at any breakpoint.
      // This is the current behavior of the recast function.
    });
  });

  describe("breakpoints functionality", () => {
    it("should handle specific breakpoints", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
          },
        },
        breakpoints: ["sm", "lg"],
      });

      // @ts-expect-error - invalid breakpoint in props (`md`)
      const { container } = render(<Button size={{ default: "sm", sm: "md", md: "lg", lg: "lg" }}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base text-sm sm:text-md lg:text-lg");
      expect(container.firstChild).not.toHaveClass("md:text-lg");
    });

    it("should ignore breakpoints if not specified", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
          },
        },
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { container } = render(<Button size={{ default: "sm", sm: "md", md: "lg", lg: "lg" }}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base text-sm sm:text-md md:text-lg lg:text-lg");
    });
  });

  describe("edge cases and special scenarios", () => {
    it("should pass through additional props to the base component", () => {
      const onClickMock = vi.fn();

      const Button = recast(BaseButton, {
        base: "text-base",
      });

      render(
        <Button data-testid="test-button" onClick={onClickMock}>
          Test
        </Button>,
      );
      const button = screen.getByTestId("test-button");

      expect(button).toHaveAttribute("data-testid", "test-button");
      expect(button).toHaveClass("text-base");

      fireEvent.click(button);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("should allow overriding of styles with className prop using a custom merge function", () => {
      const Button = recast(
        BaseButton,
        {
          base: "text-base bg-blue-500",
          variants: {
            size: {
              sm: "text-sm",
              lg: "text-lg",
            },
          },
        },
        cn,
      );

      const { container: container1 } = render(<Button className="bg-red-500">Test</Button>);
      expect(container1.firstChild).toHaveClass("text-base bg-red-500");
      expect(container1.firstChild).not.toHaveClass("bg-blue-500");

      const { container: container2 } = render(
        <Button size="lg" className="bg-green-500">
          Test
        </Button>,
      );
      expect(container2.firstChild).toHaveClass("text-lg bg-green-500");
      expect(container2.firstChild).not.toHaveClass("bg-blue-500");

      const { container: container3 } = render(
        <Button size="sm" className="p-2">
          Test
        </Button>,
      );
      expect(container3.firstChild).toHaveClass("text-sm bg-blue-500 p-2");
    });

    it("should handle undefined variant values", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
      });

      const { container } = render(<Button size={undefined}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base");
      expect(container.firstChild).not.toHaveClass("text-sm");
      expect(container.firstChild).not.toHaveClass("text-lg");
    });

    it("should handle complex edge cases correctly", () => {
      const Button = recast(BaseButton, {
        // @ts-expect-error Testing empty string and undefined in base classes array
        base: ["text-base", "", undefined, "font-normal"],
        variants: {
          color: {
            red: "text-red-500",
            blue: "text-blue-500",
            "": "",
            // @ts-expect-error Testing undefined as a variant value
            green: undefined,
          },
          size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
          },
        },
        modifiers: {
          disabled: "opacity-50 cursor-not-allowed",
          active: "",
          // @ts-expect-error Testing undefined as a modifier value
          hidden: undefined,
        },
        conditionals: [
          {
            variants: { color: "red", size: "lg" },
            modifiers: ["disabled"],
            className: "border-2 border-red-500",
          },
          {
            variants: { color: "" },
            modifiers: ["active"],
            className: "ring-2 ring-blue-500",
          },
        ],
      });

      const variants = {
        color: { default: "red", md: "", lg: "green", xl: "blue" },
        size: { default: "sm", md: "lg", xl: undefined },
      };

      const { container } = render(
        // @ts-expect-error Testing invalid prop values
        <Button {...variants} disabled active hidden>
          Test
        </Button>,
      );

      expect(container.firstChild).toHaveClass(
        "text-base font-normal text-red-500 xl:text-blue-500 text-sm md:text-lg",
      );

      // Separate checks for modifier and conditional classes
      expect(container.firstChild).toHaveClass("opacity-50 cursor-not-allowed");
      expect(container.firstChild).toHaveClass("border-2 border-red-500");
      expect(container.firstChild).toHaveClass("ring-2 ring-blue-500");
    });
  });

  describe("nested components", () => {
    // Define a nested component structure
    type SliderProps = React.ComponentPropsWithoutRef<"div"> &
      RecastWithClassNameProps<{
        root: string;
        track: string;
        range: string;
        thumb: string;
      }> & {
        className?: string;
      };

    const SliderPrimitive = React.forwardRef<HTMLDivElement, SliderProps>(({ className, rcx, ...props }, ref) => {
      return (
        <div ref={ref} className={rcx?.root} data-testid="slider-root" {...props}>
          <div className={rcx?.track} data-testid="slider-track">
            <div className={rcx?.range} data-testid="slider-range" />
          </div>
          <div className={rcx?.thumb} data-testid="slider-thumb" />
        </div>
      );
    });

    SliderPrimitive.displayName = "SliderPrimitive";

    afterEach(() => {
      cleanup();
    });

    it("should handle nested component styles correctly", () => {
      const Slider = recast(SliderPrimitive, {
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          range: "bg-primary absolute h-full",
          thumb: "block h-4 w-4 rounded-full border border-black/50 bg-white shadow",
        },
        variants: {
          size: {
            sm: {
              root: "h-4",
              thumb: "h-3 w-3",
            },
            md: {
              root: "h-5",
              thumb: "h-4 w-4",
            },
            lg: {
              root: "h-6",
              thumb: "h-5 w-5",
            },
          },
        },
      });

      const { getByTestId } = render(<Slider size="md" />);

      expect(getByTestId("slider-root")).toHaveClass("relative flex w-full touch-none select-none items-center h-5");
      expect(getByTestId("slider-track")).toHaveClass(
        "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
      );
      expect(getByTestId("slider-range")).toHaveClass("bg-primary absolute h-full");
      expect(getByTestId("slider-thumb")).toHaveClass(
        "block h-4 w-4 rounded-full border border-black/50 bg-white shadow",
      );
    });

    it("should handle responsive styles in nested components", () => {
      const Slider = recast(SliderPrimitive, {
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          range: "bg-primary absolute h-full",
          thumb: "block rounded-full border border-black/50 bg-white shadow",
        },
        variants: {
          size: {
            sm: {
              root: "h-4",
              thumb: "h-3 w-3",
            },
            md: {
              root: "h-5",
              thumb: "h-4 w-4",
            },
            lg: {
              root: "h-6",
              thumb: "h-5 w-5",
            },
          },
        },
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      const { getByTestId } = render(<Slider size={{ default: "sm", md: "lg" }} />);

      expect(getByTestId("slider-root")).toHaveClass(
        "relative flex w-full touch-none select-none items-center h-4 md:h-6",
      );

      expect(getByTestId("slider-thumb")).toHaveClass(
        "block rounded-full border border-black/50 bg-white shadow h-3 w-3 md:h-5 md:w-5",
      );
    });

    it("should apply modifiers to nested components", () => {
      const Slider = recast(SliderPrimitive, {
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          thumb: "block rounded-full border border-black/50 bg-white shadow",
        },
        modifiers: {
          disabled: {
            root: "opacity-50 cursor-not-allowed",
            thumb: "bg-gray-300",
          },
        },
      });

      const { getByTestId } = render(<Slider disabled />);

      expect(getByTestId("slider-root")).toHaveClass(
        "relative flex w-full touch-none select-none items-center opacity-50 cursor-not-allowed",
      );
      expect(getByTestId("slider-thumb")).toHaveClass("block rounded-full border border-black/50 bg-gray-300 shadow");
    });

    it("should apply conditional styles to nested components", () => {
      const Slider = recast(SliderPrimitive, {
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          thumb: "block rounded-full border border-black/50 bg-white shadow",
        },
        variants: {
          color: {
            blue: { thumb: "bg-blue-500" },
            red: { thumb: "bg-red-500" },
          },
          size: {
            sm: { root: "h-4", thumb: "h-3 w-3" },
            lg: { root: "h-6", thumb: "h-5 w-5" },
          },
        },
        conditionals: [
          {
            variants: { color: "blue", size: "lg" },
            className: { thumb: "border-blue-700" },
          },
        ],
      });

      const { getByTestId } = render(<Slider color="blue" size="lg" />);

      expect(getByTestId("slider-root")).toHaveClass("relative flex w-full touch-none select-none items-center h-6");
      expect(getByTestId("slider-thumb")).toHaveClass(
        "block rounded-full border border-blue-700 bg-blue-500 shadow h-5 w-5",
      );
    });

    it("should combine multiple variants correctly", () => {
      const Slider = recast(SliderPrimitive, {
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          thumb: "block rounded-full border border-black/50 shadow",
        },
        variants: {
          color: {
            blue: { thumb: "bg-blue-500" },
            red: { thumb: "bg-red-500" },
          },
          size: {
            sm: { root: "h-4", thumb: "h-3 w-3" },
            lg: { root: "h-6", thumb: "h-5 w-5" },
          },
          rounded: {
            full: { thumb: "rounded-full" },
            md: { thumb: "rounded-md" },
          },
        },
      });

      const { getByTestId } = render(<Slider color="blue" size="lg" rounded="md" />);

      expect(getByTestId("slider-root")).toHaveClass("relative flex w-full touch-none select-none items-center h-6");
      expect(getByTestId("slider-thumb")).toHaveClass(
        "block rounded-md border border-black/50 shadow bg-blue-500 h-5 w-5",
      );
    });

    it("should pass through additional props to the base component", () => {
      const Slider = recast(SliderPrimitive, {
        base: {
          root: "relative flex w-full touch-none select-none items-center",
        },
      });

      const { getByTestId } = render(<Slider data-custom-attr="test-value" />);

      expect(getByTestId("slider-root")).toHaveAttribute("data-custom-attr", "test-value");
    });
  });

  describe("Type Checking", () => {
    it("should correctly infer types from input styles", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
          color: {
            primary: "bg-blue-500",
            secondary: "bg-gray-500",
          },
        },
      });

      // This should compile without errors
      <Button size="sm" color="primary" />;

      // @ts-expect-error - Size variant does not exist
      <Button size="md" />;

      // @ts-expect-error - color variant does not exist
      <Button color="tertiary" />;
    });

    it("should correctly type default variants", () => {
      const Button = recast(BaseButton, {
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        defaults: {
          variants: {
            size: "sm",
          },
        },
        breakpoints: ["sm", "md", "lg", "xl"],
      });

      // This should compile without errors
      <Button />;

      // This should also compile without errors
      <Button size="lg" />;

      // @ts-expect-error - size variant does not exist
      <Button size="md" />;
    });
  });
});
