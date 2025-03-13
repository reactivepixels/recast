import { Button } from "./components/button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <h1 className="text-4xl font-bold underline">
        Hello world!
      </h1>

      <Button size="lg" variant="secondary">
        Sandbox
      </Button>
      {/* <Button
        variant={{ default: "primary", "2xl": "secondary" }}
        size={{ default: "sm", md: "md", "2xl": "lg" }}
      >
        Yo
      </Button> */}
      {/* <Button size={{ default: "sm", md: "lg" }}>Kevin</Button> */}
    </div>
  );
}
