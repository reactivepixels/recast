import React, { forwardRef } from "react";
import { useConfig } from "nextra-theme-docs";
import { Badge } from "../badge";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;

const DocLinks = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    const { frontMatter } = useConfig();

    if (frontMatter.radix?.link || frontMatter.radix?.api) {
      return (
        <div className="flex items-center space-x-2 pt-4" ref={ref} {...props}>
          {frontMatter.radix?.link && (
            <Badge asChild>
              <Link
                href={frontMatter.radix.link}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 25 25" fill="none" className="mr-1 h-3 w-3">
                  <path
                    d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
                    fill="currentcolor"
                  ></path>
                  <path d="M12 0H4V8H12V0Z" fill="currentcolor"></path>
                  <path
                    d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
                    fill="currentcolor"
                  ></path>
                </svg>
                Radix UI
              </Link>
            </Badge>
          )}

          {frontMatter.radix?.api && (
            <Badge variant="secondary" asChild>
              <Link
                href={frontMatter.radix.api}
                target="_blank"
                rel="noreferrer"
              >
                API Reference
              </Link>
            </Badge>
          )}
        </div>
      );
    }

    return <></>;
  }
);

DocLinks.displayName = "DocLinks";

export default DocLinks;
