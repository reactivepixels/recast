"use client";

import React, { forwardRef, useCallback, useState } from "react";
import clsx from "clsx";
import { Heading, SectionWrapper, Stack, Type } from "../elements";
import { CodeDemo } from "./CodeDemo";
import { demo } from "../../demos/demo";
import { DemoButton } from "../elements/DemoButton";
import { motion } from "framer-motion";

type Props = React.ComponentProps<typeof SectionWrapper>;

export const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.25,
    },
  },
  hide: {
    y: -20,
    opacity: 0,
  },
};

const Header = forwardRef<React.ComponentRef<typeof SectionWrapper>, Props>(
  ({ className, ...props }, ref) => {
    const [demoIndex, setDemoIndex] = useState(0);
    const [buttonProps, setButtonProps] = useState({});

    const onCodeDemoUpdate = useCallback(
      (props: Record<string, string>) => {
        setButtonProps({ ...props });
      },
      [setButtonProps]
    );

    const onCodeDemoComplete = useCallback(
      (props: Record<string, string>) => {
        setButtonProps({ ...props });

        if (demoIndex < demo.length - 1) {
          setDemoIndex(demoIndex + 1);
        } else {
          setDemoIndex(0);
        }
      },
      [setButtonProps, setDemoIndex, demoIndex]
    );

    return (
      <SectionWrapper
        className={clsx(
          className,
          "bg-[url('/images/distance_nebulae_bg.jpg')]",
          "bg-[calc(50%_+_150px)_0]",
          "bg-no-repeat",
          "bg-dark",
          "py-24",
          "pt-48"
        )}
        ref={ref}
        {...props}
      >
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-8 items-center lg:items-start">
          <Stack size="lg" className="max-w-xs">
            <Stack>
              <Heading>
                Build components <span className="text-white">once</span>. Use{" "}
                <span className="text-white">everywhere</span>.
              </Heading>

              <Type variant="dark">
                <span className="text-secondary">Recast</span> is a
                fundamentally different approach to building React components to
                maximise reusability.
              </Type>
            </Stack>

            <div className="h-16">
              <motion.div
                key={Object.keys(buttonProps).length || 0}
                variants={variants}
                animate={"show"}
                initial="hide"
              >
                <DemoButton className="w-fit" {...buttonProps}>
                  Get started!
                </DemoButton>
              </motion.div>
            </div>
          </Stack>

          <div className="relative hidden sm:flex">
            <div className="w-[570px] lg:absolute lg:w-[540px]">
              <CodeDemo
                demo={demo[demoIndex]}
                onChange={onCodeDemoUpdate}
                onComplete={onCodeDemoComplete}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }
);

if (process.env["NODE_ENV"] !== "production") Header.displayName = "Header";

export default Header;
