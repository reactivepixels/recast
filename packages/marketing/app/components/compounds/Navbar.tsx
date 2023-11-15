"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { Link, SectionWrapper } from "../elements";
import { GithubIcon } from "../icons";
import RecastLogo from "./RecastLogo";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Navbar = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          className,
          "bg-dark",
          "fixed",
          "top-0",
          "left-0",
          "w-full",
          "h-24",
          "z-10",
          "z-50",
          "flex",
          "flex-col",
          "justify-between"
        )}
        ref={ref}
        {...props}
      >
        <SectionWrapper className="py-4">
          <div className="flex justify-between items-center">
            <Link href="/" variant="unstyled">
              <RecastLogo />
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/docs" variant="dark">
                Docs
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                variant="dark"
                startEl={<GithubIcon />}
              >
                GitHub
              </Link>
            </div>
          </div>
        </SectionWrapper>
        <div className="h-px bg-gradient-to-r from-primary via-secondary to-primary"></div>
      </div>
    );
  }
);

if (process.env["NODE_ENV"] !== "production") Navbar.displayName = "Navbar";

export default Navbar;
