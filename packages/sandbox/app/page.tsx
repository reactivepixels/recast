import { Button } from "./components/button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <Button size="lg" variant="secondary">
        Sandbox
      </Button>
      {/* <Button
        variant={{ default: "primary", md: "secondary", lg: "tertiary" }}
        size={{ default: "sm", md: "md", "2xl": "lg" }}
      /> */}
      <Button size={{ default: "sm", md: "lg" }} />
    </div>
  );
}
