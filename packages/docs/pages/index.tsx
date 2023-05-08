import type { NextPage } from "next";
import Button from "../components/Button";

const Recast: NextPage = () => {
  return (
    <main className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Button size="sm" variant="avocado">
          Button
        </Button>
      </div>

      <div className="flex  flex-col gap-4">
        <Button
          size={{ default: "sm", sm: "md", lg: "lg" }}
          variant={{ default: "vanilla", sm: "orange", lg: "avocado" }}
          modifier={{
            default: ["block", "floating"],
            sm: "floating",
          }}
        >
          Button
        </Button>
      </div>
    </main>
  );
};

export default Recast;
