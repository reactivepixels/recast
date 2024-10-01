import { Button } from "./components/button";
import { SectionWrapperNew } from "./components/section-wrapper";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-12 justify-center items-center w-full min-h-screen">
      <SectionWrapperNew george="sms" kevin="arnold">
        Content
      </SectionWrapperNew>

      <Button size="huge" variant="secondary">
        Sandbox
      </Button>

      <Button
        variant={{ default: "primary", sm: "secondary", lg: "tertiary" }}
        size={{ default: "md", sm: "tiny", md: "md", lg: "huge" }}
        george="sms"
        block
      >
        Yo
      </Button>
    </div>
  );
}
