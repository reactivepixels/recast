import { Button } from "./components/button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <h1 className="text-4xl font-bold underline">Hello world!</h1>

      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold">Buttons</h2>
        <div className="flex gap-4">
          <Button size="sm" variant="primary">
            Primary
          </Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </div>
    </div>
  );
}
