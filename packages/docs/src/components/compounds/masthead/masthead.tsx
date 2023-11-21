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
          "bg-[url('/images/distance_nebulae_bg.jpg')]",
          "bg-[calc(50%_+_150px)_0]",
          "bg-no-repeat",
          "overflow-hidden",
          "rounded-lg",
          "px-8",
          "md:px-16",
          "py-12",
          "lg:py-24",
          className,
        )}
        ref={ref}
        {...props}
      >
        <Stack size="lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans w-fit text-transparent bg-gradient-to-r from-[#6644D5] via-t-[#F34D7E] to-[#F34D7E] bg-clip-text">
            Build components <span className="text-white">once</span>.<br /> Use{" "}
            <span className="text-white">everywhere</span>.
          </h1>

          <p className="text-base max-w-lg text-white">
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
