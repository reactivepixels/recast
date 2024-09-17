import { Button } from "./components/button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <Button size="lg" variant="secondary">
        Sandbox
      </Button>
      <Button
        variant={{ default: "primary", md: "secondary", lg: "tertiary" }}
        size={{ default: "sm", md: "md", "2xl": "lg" }}
      >
        Yo
      </Button>
      <Button size={{ default: "sm", md: "lg" }}>Kevin</Button>

      <div className="font-bold hover:unset:font-bold">
        This text is bold, but font-weight will be unset on hover.
      </div>

      <div className="italic underline lg:unset:italic lg:unset:underline">
        This text is italic and red, but both will be unset on large screens.
      </div>
    </div>
  );
}
