import React, { useEffect, useRef } from "react";

/**
 * A React hook that merges multiple React refs into one to use on an element.
 * @param {Array<string|object|Function|null>} refs React refs.
 * @returns {object} React ref.
 */
export const useMergedRef = <T extends object>(
  refs: Array<
    React.MutableRefObject<T | null> | React.RefCallback<T> | null | undefined
  >,
): React.MutableRefObject<T | null> => {
  const mergedRef = useRef(null);

  useEffect(() => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(mergedRef.current);
      else ref.current = mergedRef.current;
    }
  }, [refs]);

  return mergedRef;
};
