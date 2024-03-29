import { Style } from "@/models/style";
import RealisticFilterShape from "./realisticFilterShape";
import styled from "styled-components";
import { realisticCss, slantingCss } from "@/lib/utils";

const SlantingMark = styled.mark`
  position: relative;
  &::after {
    ${Object.entries(slantingCss)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n")}
    background-color: ${(props) => props.color};
  }
`;

const RealisticMark = styled.mark`
  position: relative;
  &::after {
    ${Object.entries(realisticCss)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n")}
    background-color: ${(props) => props.color};
  }
`;

type MottoProps = {
  style: Style;
  color: string;
  css: React.CSSProperties;
};

export default function Motto({ style, color, css }: MottoProps) {
  return (
    <p className="text-3xl lg:text-5xl text-center max-w-[27rem]">
      <span>Highlight Your Text in</span>{" "}
      <span>
        {style === Style.Monochrome || style === Style.Gradient ? (
          <mark style={css}>Seconds</mark>
        ) : style === Style.Slanting ? (
          <SlantingMark style={css} color={color}>
            Seconds
          </SlantingMark>
        ) : style === Style.Realistic ? (
          <>
            <RealisticMark style={css} color={color}>
              Seconds
            </RealisticMark>
            <RealisticFilterShape />
          </>
        ) : null}{" "}
      </span>
      <span>Here</span>
    </p>
  );
}
