import React, { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Component = forwardRef<HTMLTextAreaElement, Props>(
  ({ ...props }, ref) => {
    return <textarea ref={ref} {...props} />;
  },
);

Component.displayName = "TextareaPrimitive";

export const TextareaPrimitive = Component;
