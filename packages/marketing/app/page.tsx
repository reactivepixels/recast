import { Button } from "./components/client/Button";
import { Card } from "./components/server/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="orange">Hello 2</Button>

      <Button
        variant={{ default: "orange", lg: "avocado", sm: "avocado" }}
        size="lg"
      >
        Hello 2
      </Button>

      <Card variant="dark" elevated>
        Hello 1
      </Card>
      <Card>Hello 2</Card>
      <Card>Hello 3</Card>
    </main>
  );
}
