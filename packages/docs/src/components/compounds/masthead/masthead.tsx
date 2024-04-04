import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Stack } from "@/components/ui/stack";

type Props = React.ComponentProps<typeof SectionWrapper>;

const Masthead = forwardRef<React.ComponentRef<typeof SectionWrapper>, Props>(
  ({ className, ...props }, ref) => {
    return (
      <SectionWrapper
        className={cn(
          "bg-[url('https://raw.githubusercontent.com/reactivepixels/recast/main/packages/docs/public/images/distance_nebulae_bg.jpg')]",
          "bg-[calc(50%_+_150px)_0]",
          "bg-no-repeat",
          "overflow-hidden",
          "rounded-lg",
          "sm:px-8",
          "py-6",
          "sm:py-12",
          "lg:py-24",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Stack size="lg">
          <h1 className="via-t-[#F34D7E] w-fit bg-gradient-to-r from-[#6644D5] to-[#F34D7E] bg-clip-text font-sans text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            Build components <span className="text-white">once</span>.<br /> Use{" "}
            <span className="text-white">everywhere</span>.
          </h1>

          <p className="max-w-lg text-base text-white">
            <span className="text-[#F34D7E]">Recast</span> is a fundamentally
            different approach to building React components to maximise
            reusability.
          </p>
        </Stack>
      </SectionWrapper>
    );
  },
);

Masthead.displayName = "Masthead";

export default Masthead;
