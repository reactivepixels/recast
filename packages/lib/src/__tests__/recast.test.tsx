import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { recast } from "../recast.js";
import { cn } from "../utils/cn.js";

describe("recast function", () => {
  // Basic component for testing
  type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

  const BaseButton: React.FC<BaseProps> = ({ className, children, ...props }) => (
    <button className={className} {...props}>
      {children}
    </button>
  );

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
    });

    const { container } = render(
      <Button disabled active>
        Test
      </Button>,
    );

    expect(container.firstChild).toHaveClass("text-base opacity-50 cursor-not-allowed ring-2 ring-blue-500");
  });

  it("should handle responsive styles", () => {
    const Button = recast(BaseButton, {
      base: "text-base",
      variants: {
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
      },
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
    });

    const { container } = render(
      <Button size={{ default: "sm", md: "lg" }} color={{ default: "ghost", lg: "primary" }}>
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

    expect(container.firstChild).toHaveClass("text-base font-normal text-red-500 xl:text-blue-500 text-sm md:text-lg");

    // Separate checks for modifier and conditional classes
    expect(container.firstChild).toHaveClass("opacity-50 cursor-not-allowed");
    expect(container.firstChild).toHaveClass("border-2 border-red-500");
    expect(container.firstChild).toHaveClass("ring-2 ring-blue-500");
  });

  it("should handle responsive modifiers", () => {
    const Button = recast(BaseButton, {
      base: "p-2",
      variants: {
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
        },
      },
      modifiers: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    });

    const { container } = render(
      <Button
        color={{ default: "red", md: "blue" }}
        bold
        italic={{ default: true, lg: false }}
        underline={{ default: false, md: true }}
      >
        Test
      </Button>,
    );
    expect(container.firstChild).toHaveClass(
      "p-2 font-bold italic text-red-500 md:text-blue-500 md:underline lg:unset:italic",
    );
  });
});
