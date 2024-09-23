"use client";

import { forwardRef, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

type Props = React.ComponentPropsWithoutRef<typeof motion.div> & {
  value: number;
};

const AnimatedNumber = forwardRef<React.ElementRef<typeof motion.div>, Props>(
  ({ value, ...props }, ref) => {
    let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    let display = useTransform(spring, (current: number) =>
      Math.round(current).toLocaleString()
    );

    useEffect(() => {
      spring.set(value);
    }, [spring, value]);

    return (
      <motion.span ref={ref} {...props}>
        {display}
      </motion.span>
    );
  }
);

AnimatedNumber.displayName = "AnimatedNumber";

export default AnimatedNumber;
