import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export function getBreakpointFromWidth(width: number): Breakpoint {
  if (width <= 640) return "sm";
  else if (width <= 768) return "md";
  else if (width <= 1024) return "lg";
  else if (width <= 1280) return "xl";
  else return "2xl";
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>();
  useLayoutEffect(() => {
    function updateSize() {
      const currBreakpoint = getBreakpointFromWidth(window.innerWidth);
      if (breakpoint !== currBreakpoint) setBreakpoint(currBreakpoint);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return breakpoint;
}
