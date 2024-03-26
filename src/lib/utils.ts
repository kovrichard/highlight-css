import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slantingCss = {
  content: '""',
  position: "absolute",
  width: "calc(100% + 0.5rem)",
  height: "60%",
  left: "-2px",
  bottom: "0",
  "z-index": "-1",
  transform: "rotate(-2deg)",
};

export const realisticCss = {
  content: '""',
  position: "absolute",
  width: "100%",
  height: "105%",
  left: "-0.25rem",
  top: "-0.05rem",
  "z-index": "-1",
  filter: "url(#marker-shape)",
};
