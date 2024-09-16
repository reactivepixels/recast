export function getBreakpoints(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  const breakpointsString = getComputedStyle(document.documentElement).getPropertyValue("--recast-breakpoints").trim();

  try {
    return JSON.parse(breakpointsString);
  } catch {
    console.warn("Failed to parse Recast breakpoints");
    return [];
  }
}
