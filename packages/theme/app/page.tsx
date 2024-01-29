import { BlueprintCard } from "@/components/ui/blueprint-card";
import { Switch } from "@/components/ui/switch";

export default function Page() {
  return (
    <main className="flex grow flex-col min-h-screen p-2 md:p-8 gap-8">
      <div className="flex">
        <div className="w-8 h-8 bg-primary-900 flex justify-center items-center">
          <span className="text-2xs">900</span>
        </div>
        <div className="w-8 h-8 bg-primary-800 flex justify-center items-center">
          <span className="text-2xs">800</span>
        </div>
        <div className="w-8 h-8 bg-primary-700 flex justify-center items-center">
          <span className="text-2xs">700</span>
        </div>
        <div className="w-8 h-8 bg-primary-600 flex justify-center items-center">
          <span className="text-2xs">600</span>
        </div>
        <div className="w-8 h-8 bg-primary-500 flex justify-center items-center">
          <span className="text-2xs">500</span>
        </div>
        <div className="w-8 h-8 bg-primary-400 flex justify-center items-center">
          <span className="text-2xs">400</span>
        </div>
        <div className="w-8 h-8 bg-primary-300 flex justify-center items-center">
          <span className="text-2xs">300</span>
        </div>
        <div className="w-8 h-8 bg-primary-200 flex justify-center items-center">
          <span className="text-2xs">200</span>
        </div>
        <div className="w-8 h-8 bg-primary-100 flex justify-center items-center">
          <span className="text-2xs">100</span>
        </div>
      </div>
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
