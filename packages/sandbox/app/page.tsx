import { Button } from "./components/button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <h1 className="text-4xl font-bold underline">Hello world!</h1>

      <Button size="lg" variant="secondary">
        Sandbox
      </Button>
    </div>
  );
}
