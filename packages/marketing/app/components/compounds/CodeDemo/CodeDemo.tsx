"use client";

import CodeCompletion from "./CodeCompletion";
import { CodeWindow } from "./CodeWindow";

export type CodeDemo = {
  value: string;
  classes: string;
  completions: string[];
};

type Props = {
  demo: CodeDemo[];
  onChange: (props: Record<string, string>) => void;
  onComplete: (props: Record<string, string>) => void;
};

function CodeDemo({ ...props }: Props) {
  return (
    <CodeWindow className="h-48 w-full">
      <div className="flex-auto flex min-h-0">
        <div className="flex-auto flex flex-col min-w-0">
          <CodeCompletion {...props} />
        </div>
      </div>
    </CodeWindow>
  );
}

export default CodeDemo;
