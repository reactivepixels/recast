import { Button } from "./components/button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <Button size="lg" variant="secondary">
        Sandbox
      </Button>
      <Button
        variant={{ default: "primary", md: "secondary" }}
        size={{ default: "md", lg: "sm", mds: "lg" }}
      >
        Sandbox
      </Button>
    </div>
  );
}
