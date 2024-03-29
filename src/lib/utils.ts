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

export const filterSvg = `
<svg
  xmlns="//www.w3.org/2000/svg"
  version="1.1"
  class="svg-filters"
  style="display: none;"
>
  <defs>
    <filter id="marker-shape">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0 0.15"
        numOctaves="1"
        result="warp"
      />
      <feDisplacementMap
        xChannelSelector="R"
        yChannelSelector="G"
        scale="30"
        in="SourceGraphic"
        in2="warp"
      />
    </filter>
  </defs>
</svg>
`;
