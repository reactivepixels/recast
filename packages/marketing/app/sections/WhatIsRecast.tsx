"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { addBasePath } from "@/app/utils";
import { Heading, SectionWrapper, Stack, Type } from "../components/elements";

type Props = React.ComponentProps<typeof SectionWrapper>;

const WhatIsRecast = forwardRef<
  React.ComponentRef<typeof SectionWrapper>,
  Props
>(({ children, className, ...props }, ref) => {
  return (
    <SectionWrapper className={className} ref={ref} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Stack>
          <Stack size="none">
            <Heading size="xs" variant="primary">
              01
            </Heading>
            <Heading size="lg">What is Recast?</Heading>
          </Stack>
          <Type>
            <span className="text-secondary">Recast</span> is a collection of
            utilities that enable you to build truly reusable component
            primitives.
          </Type>

          <Type>
            By following the{" "}
            <span className="text-primary">&ldquo;SVM&rdquo;</span> methodology
            - Recast enables you to achieve all your component theming
            requirements through a combination of three intrinsic component
            properties: <span className="text-secondary">`size`</span>,{" "}
            <span className="text-secondary">`variant`</span> and{" "}
            <span className="text-secondary">`modifier`</span> a.k.a.{" "}
            <span className="text-primary">SVM</span>.
          </Type>

          <Type>
            This means that your component primitives are completely decoupled
            from the theme layer and can be reused over and over again without
            ever worrying about trying to achieve the impractical
            &lsquo;one-size-fits-all&rsquo; approach of baking in all possible
            theme variations as props.
          </Type>
        </Stack>
        <div className="mix-blend-darken hidden md:block">
          <Image
            src={addBasePath("images/abstract_machine.png")}
            width={566}
            height={566}
            alt=""
            unoptimized
          />
        </div>
      </div>
    </SectionWrapper>
  );
});

if (process.env["NODE_ENV"] !== "production")
  WhatIsRecast.displayName = "WhatIsRecast";

export default WhatIsRecast;
