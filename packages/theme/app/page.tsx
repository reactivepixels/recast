import { BlueprintCard } from "@/components/ui/blueprint-card";
import { ColorPalette } from "@/components/ui/color-palette";
import { Switch } from "@/components/ui/switch";

export default function Page() {
  return (
    <main className="flex grow flex-col min-h-screen p-2 md:p-8 gap-8">
      <ColorPalette />

      <BlueprintCard
        title="Switch"
        className="max-w-screen-sm"
        description="A control that allows the user to toggle between checked and not checked."
      >
        <Switch id="mode" />
      </BlueprintCard>
    </main>
  );
}
