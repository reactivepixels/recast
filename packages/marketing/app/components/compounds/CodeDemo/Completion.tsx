"use client";

import React, { useEffect, useState } from "react";
import { CodeDemo } from "./CodeDemo";
import { motion } from "framer-motion";

type Props = {
  demo: CodeDemo[];
  onChange: (props: Record<string, string>) => void;
  onComplete: (props: Record<string, string>) => void;
};

const attrClasses = "tag attr-name token";
const valClasses = "tag attr-value token";

const getActiveAttributes = (demo: CodeDemo[], stage: number) => {
  return demo.slice(0, stage).reduce((acc, curr, index) => {
    if (curr.classes === attrClasses) {
      const val = demo
        .slice(index, stage)
        .find((x) => x.classes === valClasses);

      return { ...acc, [curr.value]: val?.value || true };
    }

    return acc;
  }, {});
};

const Completion = ({ demo, onChange, onComplete, ...props }: Props) => {
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (demo[stage].value === " ") {
      onChange(getActiveAttributes(demo, stage));
    }
  }, [stage, demo, onChange]);

  if (!demo?.length) {
    return <></>;
  }

  return (
    <>
      {stage > 0 &&
        demo.slice(0, stage).map((x, index) => {
          return (
            <span key={`stage-${x}-${x.value}-${index}`} className={x.classes}>
              {x.value}
            </span>
          );
        })}

      <span className={demo[stage].classes}>
        {demo[stage].value.split("").map((char, j) => {
          return (
            <span key={`${j}-${char}`}>
              <motion.span
                initial={{ display: "none" }}
                animate={{ display: "inline" }}
                transition={{ delay: (j + 1) * 0.15 }}
                onAnimationComplete={() => {
                  if (j < demo[stage].value.length - 1) {
                    setTyped(typed + char);
                  } else {
                    setTyped("");
                  }

                  if (
                    j === demo[stage].value.length - 1 &&
                    stage < demo.length - 1
                  ) {
                    setStage(stage + 1);
                  }

                  if (
                    j === demo[stage].value.length - 1 &&
                    stage === demo.length - 1
                  ) {
                    onChange(getActiveAttributes(demo, demo.length));

                    window.setTimeout(() => {
                      onComplete(getActiveAttributes(demo, demo.length));
                      setStage(0);
                    }, 5000);
                  }
                }}
              >
                {char}
              </motion.span>
            </span>
          );
        })}

        {!!demo[stage].completions?.length &&
          !!typed.length &&
          typed.length < demo[stage].value.length && (
            <span className="relative z-10">
              <div className="absolute top-full left-full m-0.5 rounded-lg shadow-xl">
                <div className="relative w-96 bg-slate-700 overflow-hidden rounded-lg">
                  <ul className="relative leading-5 text-white py-3 px-5">
                    {demo[stage].completions
                      // .filter((completion) =>
                      //   typed.length > 3
                      //     ? completion.startsWith(typed.trim())
                      //     : completion
                      // )
                      // .slice(0, 12)
                      .map((completion, i) => (
                        <li key={completion}>
                          <span className="flex-none !text-slate-50">
                            {completion
                              .split(new RegExp(`(^${typed.trim()})`))
                              .map((part: string, j: number) =>
                                part ? (
                                  j % 2 === 0 ? (
                                    part
                                  ) : (
                                    <span key={j} className="!text-teal-200">
                                      {part}
                                    </span>
                                  )
                                ) : null
                              )}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </span>
          )}
      </span>
    </>
  );
};

if (process.env["NODE_ENV"] !== "production")
  Completion.displayName = "Completion";

export default Completion;
