import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { recast } from "../recast.js";
import { cn } from "../utils/cn.js";
import type { RecastClsProps } from "../types.js";

describe("recast.styles", () => {
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

  // Slider primitive for nested component testing
  const SliderPrimitive = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & RecastClsProps<"root" | "track" | "thumb">
  >(({ className, cls, children, ...props }, ref) => (
    <div ref={ref} className={cn(cls?.root, className)} {...props}>
      <div className={cls?.track}>
        <div className={cls?.thumb} />
      </div>
      {children}
    </div>
  ));

  SliderPrimitive.displayName = "SliderPrimitive";

  afterEach(() => {
    cleanup();
  });

  describe("basic functionality", () => {
    it("should handle undefined className in mergeProps", () => {
      const buttonStyles = recast.styles({
        base: "text-base",
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(<Button className={undefined}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base");
    });

    it("should create a component with base styles", () => {
      const buttonStyles = recast.styles({
        base: "text-base font-normal",
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(<Button>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base font-normal");
    });

    it("should apply variant styles correctly", () => {
      const buttonStyles = recast.styles({
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
      const Button = buttonStyles(BaseButton);

      const { container } = render(
        <Button size="lg" color="primary">
          Test
        </Button>,
      );
      expect(container.firstChild).toHaveClass("text-base text-lg bg-blue-500");
    });

    it("should apply modifier styles correctly", () => {
      const buttonStyles = recast.styles({
        base: "text-base",
        modifiers: {
          disabled: "opacity-50",
          loading: "animate-spin",
        },
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(
        <Button disabled loading>
          Test
        </Button>,
      );
      expect(container.firstChild).toHaveClass("text-base opacity-50 animate-spin");
    });
  });

  describe("style extraction", () => {
    it("should extract class names without applying to a component", () => {
      const buttonStyles = recast.styles({
        base: "text-base font-medium",
        variants: {
          variant: {
            primary: "bg-blue-500 text-white",
            secondary: "bg-gray-500 text-white",
          },
          size: {
            sm: "px-2 py-1 text-sm",
            lg: "px-6 py-3 text-lg",
          },
        },
        modifiers: {
          fullWidth: "w-full",
        },
      });

      const className = buttonStyles.extract({
        variant: "primary",
        size: "lg",
        fullWidth: true,
      });

      expect(className).toBe("text-base font-medium bg-blue-500 text-white px-6 py-3 text-lg w-full");
    });

    it("should extract nested component class names", () => {
      const sliderStyles = recast.styles({
        base: {
          root: "relative flex w-full",
          track: "relative h-2 w-full",
          thumb: "block h-4 w-4 rounded-full",
        },
        variants: {
          size: {
            sm: {
              root: "h-4",
              track: "h-1",
              thumb: "h-3 w-3",
            },
            lg: {
              root: "h-6",
              track: "h-3",
              thumb: "h-5 w-5",
            },
          },
        },
      });

      const classes = sliderStyles.extract({ size: "lg" });

      expect(classes).toEqual({
        root: "relative flex w-full h-6",
        track: "relative h-2 w-full h-3",
        thumb: "block h-4 w-4 rounded-full h-5 w-5",
      });
    });
  });

  describe("global configuration", () => {
    it("should use global merge function when configured", () => {
      // Configure global merge function
      recast.configure({ mergeFn: cn });

      const buttonStyles = recast.styles({
        base: "text-base font-medium",
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(<Button className="bg-red-500">Test</Button>);
      expect(container.firstChild).toHaveClass("text-base font-medium bg-red-500");

      // Reset config
      recast.configure({});
    });

    it("should allow overriding global merge function per component", () => {
      // Configure global merge function
      recast.configure({ mergeFn: cn });

      const customMergeFn = (classes: string | string[], className?: string) =>
        `custom-${Array.isArray(classes) ? classes.join(" ") : classes} ${className || ""}`.trim();

      const buttonStyles = recast.styles({
        base: "text-base",
      });
      const Button = buttonStyles(BaseButton, customMergeFn);

      const { container } = render(<Button className="bg-blue-500">Test</Button>);
      expect(container.firstChild).toHaveClass("custom-text-base bg-blue-500");

      // Reset config
      recast.configure({});
    });
  });

  describe("edge cases and special scenarios", () => {
    it("should pass through additional props to the base component", () => {
      const onClickMock = vi.fn();

      const buttonStyles = recast.styles({
        base: "text-base",
      });
      const Button = buttonStyles(BaseButton);

      render(
        <Button onClick={onClickMock} data-testid="test-button">
          Test
        </Button>,
      );

      const button = screen.getByTestId("test-button");
      fireEvent.click(button);

      expect(onClickMock).toHaveBeenCalledOnce();
      expect(button).toHaveAttribute("data-testid", "test-button");
    });

    it("should allow overriding of styles with className prop using a custom merge function", () => {
      const buttonStyles = recast.styles({
        base: "text-base text-black",
        variants: {
          color: {
            primary: "bg-blue-500",
          },
        },
      });

      const Button = buttonStyles(BaseButton, (classes, className) => cn(classes, className));

      const { container } = render(
        <Button color="primary" className="text-white bg-red-500">
          Test
        </Button>,
      );

      // tailwind-merge should merge conflicting classes, keeping the later ones
      // text-white overrides text-black, bg-red-500 overrides bg-blue-500
      expect(container.firstChild).toHaveClass("text-base text-white bg-red-500");
    });

    it("should handle undefined variant values", () => {
      const buttonStyles = recast.styles({
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(<Button size={undefined}>Test</Button>);
      expect(container.firstChild).toHaveClass("text-base");
      expect(container.firstChild).not.toHaveClass("text-sm");
      expect(container.firstChild).not.toHaveClass("text-lg");
    });

    it("should handle complex edge cases correctly", () => {
      // Ensure clean global state
      recast.configure({});

      const buttonStyles = recast.styles({
        // @ts-expect-error Testing empty string and undefined in base classes array
        base: ["text-base", "", undefined, "font-normal"],
        variants: {
          size: {
            sm: "text-sm",
            lg: ["text-lg", "", "leading-6"],
          },
        },
        modifiers: {
          // @ts-expect-error Testing array of classes with undefined
          disabled: ["opacity-50", undefined, "cursor-not-allowed"],
        },
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(
        <Button size="lg" disabled>
          Test
        </Button>,
      );

      expect(container.firstChild).toHaveClass("text-base font-normal text-lg leading-6 opacity-50 cursor-not-allowed");
    });
  });

  describe("nested components", () => {
    it("should handle nested component styles correctly", () => {
      const sliderStyles = recast.styles({
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
        },
        variants: {
          size: {
            sm: {
              root: "h-4",
              track: "h-1",
              thumb: "h-3 w-3",
            },
            lg: {
              root: "h-6",
              track: "h-2",
              thumb: "h-5 w-5",
            },
          },
        },
      });
      const Slider = sliderStyles(SliderPrimitive);

      const { container } = render(<Slider size="lg" />);
      const rootElement = container.firstChild as HTMLElement;
      const trackElement = rootElement.querySelector("div") as HTMLElement;
      const thumbElement = trackElement.querySelector("div") as HTMLElement;

      expect(rootElement).toHaveClass("relative flex w-full touch-none select-none items-center h-6");
      expect(trackElement).toHaveClass("relative h-1.5 w-full grow overflow-hidden rounded-full bg-black h-2");
      expect(thumbElement).toHaveClass("block h-4 w-4 rounded-full border-2 border-white bg-black h-5 w-5");
    });

    it("should apply modifiers to nested components", () => {
      const sliderStyles = recast.styles({
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
        },
        modifiers: {
          disabled: {
            root: "opacity-50 cursor-not-allowed",
            thumb: "cursor-not-allowed",
          },
        },
      });
      const Slider = sliderStyles(SliderPrimitive);

      const { container } = render(<Slider disabled />);
      const rootElement = container.firstChild as HTMLElement;
      const trackElement = rootElement.querySelector("div") as HTMLElement;
      const thumbElement = trackElement.querySelector("div") as HTMLElement;

      // Check that root modifier is applied
      expect(rootElement).toHaveClass("opacity-50 cursor-not-allowed");

      // Check that thumb modifier is applied
      expect(thumbElement).toHaveClass("cursor-not-allowed");

      // Verify the thumb has its base classes too
      expect(thumbElement).toHaveClass("block h-4 w-4 rounded-full border-2 border-white bg-black");
    });

    it("should apply conditional styles to nested components", () => {
      const sliderStyles = recast.styles({
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
        },
        variants: {
          orientation: {
            horizontal: {
              root: "flex-row",
            },
            vertical: {
              root: "flex-col h-full",
            },
          },
        },
        conditionals: [
          {
            variants: { orientation: "vertical" },
            className: {
              root: "w-4",
              track: "w-1.5 h-full",
            },
          },
        ],
      });
      const Slider = sliderStyles(SliderPrimitive);

      const { container } = render(<Slider orientation="vertical" />);
      const rootElement = container.firstChild as HTMLElement;
      const trackElement = rootElement.querySelector("div") as HTMLElement;

      expect(rootElement).toHaveClass("w-4");
      expect(trackElement).toHaveClass("w-1.5 h-full");
    });

    it("should combine multiple variants correctly", () => {
      const sliderStyles = recast.styles({
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
        },
        variants: {
          size: {
            sm: {
              root: "h-4",
              track: "h-1",
              thumb: "h-3 w-3",
            },
            lg: {
              root: "h-6",
              track: "h-2",
              thumb: "h-5 w-5",
            },
          },
          color: {
            blue: {
              track: "bg-blue-500",
              thumb: "bg-blue-600",
            },
            red: {
              track: "bg-red-500",
              thumb: "bg-red-600",
            },
          },
        },
      });
      const Slider = sliderStyles(SliderPrimitive);

      const { container } = render(<Slider size="lg" color="blue" />);
      const rootElement = container.firstChild as HTMLElement;
      const trackElement = rootElement.querySelector("div") as HTMLElement;
      const thumbElement = trackElement.querySelector("div") as HTMLElement;

      expect(rootElement).toHaveClass("h-6");
      expect(trackElement).toHaveClass("h-2 bg-blue-500");
      expect(thumbElement).toHaveClass("h-5 w-5 bg-blue-600");
    });

    it("should pass through additional props to the base component", () => {
      const onClickMock = vi.fn();

      const sliderStyles = recast.styles({
        base: {
          root: "relative flex w-full touch-none select-none items-center",
          track: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-black",
          thumb: "block h-4 w-4 rounded-full border-2 border-white bg-black",
        },
      });
      const Slider = sliderStyles(SliderPrimitive);

      render(<Slider onClick={onClickMock} data-testid="test-slider" />);

      const slider = screen.getByTestId("test-slider");
      fireEvent.click(slider);

      expect(onClickMock).toHaveBeenCalledOnce();
      expect(slider).toHaveAttribute("data-testid", "test-slider");
    });
  });

  describe("Type Checking", () => {
    it("should correctly infer types from input styles", () => {
      const buttonStyles = recast.styles({
        base: "text-base",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
          color: {
            primary: "text-blue-500",
            secondary: "text-gray-500",
          },
        },
        modifiers: {
          disabled: "opacity-50",
          loading: "animate-spin",
        },
      });
      const Button = buttonStyles(BaseButton);

      // These should not cause TypeScript errors
      render(<Button size="sm" color="primary" disabled loading />);
      render(<Button size="lg" color="secondary" />);
      render(<Button />);

      expect(true).toBe(true); // If we reach here, types are working correctly
    });

    it("should correctly type default variants", () => {
      const buttonStyles = recast.styles({
        base: "text-base",
        defaults: {
          variants: { size: "md", color: "primary" },
        },
        variants: {
          size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
          },
          color: {
            primary: "text-blue-500",
            secondary: "text-gray-500",
          },
        },
      });
      const Button = buttonStyles(BaseButton);

      const { container } = render(<Button />);
      expect(container.firstChild).toHaveClass("text-base text-blue-500");
    });
  });
});
