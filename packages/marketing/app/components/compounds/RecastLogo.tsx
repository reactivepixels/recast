"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { RecastLogoIcon } from "../icons";
import { Heading } from "../elements";

type Props = React.HTMLAttributes<HTMLDivElement>;

const RecastLogo = forwardRef<HTMLHeadingElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={clsx(className, "flex items-center gap-2")}
        ref={ref}
        {...props}
      >
        <RecastLogoIcon size="inherit" width={56} height={56} />
        <Heading size="md" className="tracking-tight">
          Recast
        </Heading>
      </div>
    );
  }
);

if (process.env["NODE_ENV"] !== "production")
  RecastLogo.displayName = "RecastLogo";

export default RecastLogo;
