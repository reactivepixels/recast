"use client";

import React, { forwardRef } from "react";

import { Blueprint } from "../blueprint";
import { Card } from "../card";
import { CardContent } from "../card/card-content";
import { cn } from "@/utils/cn";

type Props = React.ComponentPropsWithoutRef<typeof Card> & {
  title: string;
  description: string;
};

const BlueprintCard = forwardRef<React.ElementRef<typeof Card>, Props>(
  ({ children, title, description, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          "before:bg-[radial-gradient(50%_50%_at_50%_50%,hsla(var(--primary),0.16)_0,hsla(var(--primary),0)_100%)] before:absolute before:inset-0 before:pointer-events-none before:z-10",
          className
        )}
        {...props}
      >
        <CardContent className="relative flex flex-col md:flex-row gap-8">
          <section className="flex flex-col">
            <div className="max-w-xl flex flex-col gap-4">
              <div className="flex flex-col gap-1 w-min">
                <div className="w-full flex gap-2 items-center before:flex-1 before:bg-gradient-to-r before:from-transparent before:to-white/25 before:h-px after:flex-1 after:bg-gradient-to-r after:from-white/25 after:to-transparent after:h-px">
                  <span className="text-xs font-light">Component</span>
                </div>
                <h1 className="font-semibold text-4xl">{title}</h1>
              </div>

              <p className="font-extralight text-balance tracking-wide leading-snug line-clamp-2 max-w-md">
                {description}
              </p>
            </div>
          </section>
          <Blueprint>{children}</Blueprint>
        </CardContent>
      </Card>
    );
  }
);

BlueprintCard.displayName = "BlueprintCard";

export default BlueprintCard;
