"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { addBasePath } from "@/app/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Footer = forwardRef<HTMLHeadingElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <footer
        className={clsx(
          className,
          "relative",
          "bg-black",
          "bg-opacity-[0.02]",
          "h-16",
          "min-h-[64px]"
        )}
        ref={ref}
        {...props}
      >
        <div className="absolute left-1/2 top-[51px] transform -translate-y-full -translate-x-1/2 z-10 mix-blend-color-burn">
          <Image
            src={addBasePath("images/footer_bg.png")}
            width={227}
            height={256}
            alt=""
            unoptimized
          />
        </div>
        {children}
      </footer>
    );
  }
);

if (process.env["NODE_ENV"] !== "production") Footer.displayName = "Footer";

export default Footer;
