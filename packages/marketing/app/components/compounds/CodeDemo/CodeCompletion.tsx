"use client";

import React, { Fragment } from "react";
import Prism from "prismjs";
import { CodeWindow } from "./CodeWindow";
import { normalizeTokens, getClassNameForToken } from "../../../utils";
import { template } from "./code-template";
import Completion from "./Completion";
import { CodeDemo } from "./CodeDemo";

type Props = {
  demo: CodeDemo[];
  onChange: (props: Record<string, string>) => void;
  onComplete: (props: Record<string, string>) => void;
};

const CodeCompletion = ({ ...props }: Props) => {
  const tokens = Prism.tokenize(template, Prism.languages.html);
  const lines = normalizeTokens(tokens);

  return (
    <CodeWindow.Code lines={lines.length} overflow={false}>
      {lines.map((tokens: any, lineIndex: any) => (
        <Fragment key={lineIndex}>
          {tokens.map((token: any, tokenIndex: any) => {
            if (token.content === "__COMPLETIONS__") {
              return <Completion {...props} key={tokenIndex} />;
            }

            return (
              <span key={tokenIndex} className={getClassNameForToken(token)}>
                {token.content}
              </span>
            );
          })}
          {"\n"}
        </Fragment>
      ))}
    </CodeWindow.Code>
  );
};

if (process.env["NODE_ENV"] !== "production")
  CodeCompletion.displayName = "CodeCompletion";

export default CodeCompletion;
