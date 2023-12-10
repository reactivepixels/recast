import type { RecastBaseStyles, RecastThemeProps } from "../types.js";
import { getRecastClasses } from "../utils/getRecastClasses.js";
import { useEffect, useState } from "react";

type RecastClasses<K> = Record<keyof K, string> | undefined;

export const useRecastClasses = <K extends RecastBaseStyles>({
  themekey,
  variants,
  modifiers,
}: RecastThemeProps): RecastClasses<K> => {
  const [data, setData] = useState(
    getRecastClasses({ themekey, variants, modifiers }),
  );

  useEffect(() => {
    setData(getRecastClasses({ themekey, variants, modifiers }));
  }, [themekey, variants, modifiers]);

  return data as RecastClasses<K>;
};
