import { Button } from "./components/button";
import { ComposedButton } from "./components/composed-button";
import { ComposedSlider } from "./components/composed-slider";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <h1 className="text-4xl font-bold underline">Recast Sandbox</h1>

      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold">Original Buttons</h2>
        <div className="flex gap-4">
          <Button size="sm" variant="primary">
            Primary
          </Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="tertiary" interactive>
            Tertiary
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold">Composed Buttons</h2>
        <p className="text-gray-600 text-center max-w-2xl">
          These buttons are created by composing separate style objects together
          using{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            recast.compose()
          </code>
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <ComposedButton variant="primary" size="sm">
            Primary Small
          </ComposedButton>
          <ComposedButton variant="secondary" size="md">
            Secondary Medium
          </ComposedButton>
          <ComposedButton variant="destructive" size="lg">
            Destructive Large
          </ComposedButton>
          <ComposedButton variant="outline" size="md" shadow>
            Outline with Shadow
          </ComposedButton>
          <ComposedButton variant="primary" size="md" fullWidth>
            Full Width
          </ComposedButton>
          <ComposedButton variant="secondary" size="sm" loading>
            Loading State
          </ComposedButton>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold">Composed Nested Components</h2>
        <p className="text-gray-600 text-center">
          These sliders demonstrate nested component composition with{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">cls</code> objects
        </p>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Slider</h3>
            <ComposedSlider />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Blue Large Slider</h3>
            <ComposedSlider color="blue" size="lg" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Red Small Slider</h3>
            <ComposedSlider color="red" size="sm" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Green Disabled Slider</h3>
            <ComposedSlider color="green" size="md" disabled />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Focused Slider</h3>
            <ComposedSlider color="blue" size="lg" focus />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-xl font-bold">How Composition Works</h2>
        <div className="bg-gray-50 p-4 rounded-lg max-w-4xl">
          <pre className="text-sm overflow-x-auto">
            {`// Create individual style objects
const baseStyles = recast.styles({
  base: "inline-flex items-center justify-center..."
});

const colorStyles = recast.styles({
  variants: {
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-800"
    }
  }
});

const sizeStyles = recast.styles({
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      lg: "px-6 py-3 text-lg"
    }
  }
});

// Compose them together
const ComposedButton = recast.compose([
  baseStyles,
  colorStyles, 
  sizeStyles
])(ButtonComponent);`}
          </pre>
        </div>
      </div>
    </div>
  );
}
