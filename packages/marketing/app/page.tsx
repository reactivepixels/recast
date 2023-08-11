import { Button } from "./components/client/Button";
import { Card } from "./components/server/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="avocado" size="lg">
        Hello 2
      </Button>

      <Button
        variant={{
          default: "orange",
          sm: "avocado",
          md: "orange",
          lg: "vanilla",
        }}
        size={{ default: "sm", sm: "md", xl: "lg" }}
        modifier={{ default: "block", lg: "dark", xl: "floating" }}
      >
        Hello 2
      </Button>

      <Card variant="dark" elevated clickable>
        Hello 1
      </Card>
      <Card>Hello 2</Card>
      <Card>Hello 3</Card>
    </main>
  );
}
