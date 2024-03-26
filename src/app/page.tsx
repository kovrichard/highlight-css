"use client";

import { useEffect, useState } from "react";
import { H1 } from "@/components/ui/typography/h1";
import { H2 } from "@/components/ui/typography/h2";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import styled from "styled-components";
import RealisticFilterShape from "@/components/realisticFilterShape";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from "@/components/codeBlock";
import { Style } from "@/models/style";
import Settings from "@/components/settings";

const slantingCss = {
  content: '""',
  position: "absolute",
  width: "calc(100% + 0.5rem)",
  height: "60%",
  left: "-2px",
  bottom: "0",
  "z-index": "-1",
  transform: "rotate(-2deg)",
};

const SlantingMark = styled.mark`
  position: relative;
  &::after {
    ${Object.entries(slantingCss)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n")}
    background-color: ${(props) => props.color};
  }
`;

const realisticCss = {
  content: '""',
  position: "absolute",
  width: "100%",
  height: "105%",
  left: "-0.25rem",
  top: "-0.05rem",
  "z-index": "-1",
  filter: "url(#marker-shape)",
};

const RealisticMark = styled.mark`
  position: relative;
  &::after {
    ${Object.entries(realisticCss)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n")}
    background-color: ${(props) => props.color};
  }
`;

export default function Home() {
  const { toast } = useToast();
  const [text, setText] = useState("Seconds");
  const [style, setStyle] = useState<Style>(Style.Gradient);
  const [color, setColor] = useState<string>("#ffe100");
  const [margin, setMargin] = useState<{ [key: string]: number }>({
    top: 0,
    right: -0.4,
  });
  const [padding, setPadding] = useState<{ [key: string]: number }>({
    top: 0.1,
    right: 0.4,
  });
  const [borderRadius, setBorderRadius] = useState<{ [key: string]: number }>({
    topLeft: 0.8,
    topRight: 0.3,
  });
  const [css, setCss] = useState<{ [key: string]: string }>({
    margin: `${margin.top}em ${margin.right}em`,
    padding: `${padding.top}em ${padding.right}em`,
    "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em`,
    background: "transparent",
    "background-image": `linear-gradient(to right, ${color}1a, ${color}ae 4%, ${color}4d)`,
    "-webkit-box-decoration-break": "clone",
    "box-decoration-break": "clone",
  });

  const copyFilterSvg = async () => {
    const text = `
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
    </svg>`;
    await navigator.clipboard.writeText(text);
    toast({
      title: "Note",
      description: "Filter SVG copied to clipboard",
    });
  };

  const changeXMargin = (value: number) => {
    setMargin({
      ...margin,
      right: value,
    });
  };

  const changeYMargin = (value: number) => {
    setMargin({
      ...margin,
      top: value,
    });
  };

  const changeXPadding = (value: number) => {
    setPadding({
      ...padding,
      right: value,
    });
  };

  const changeYPadding = (value: number) => {
    setPadding({
      ...padding,
      top: value,
    });
  };

  const changeTopLeftBottomRightRadius = (value: number) => {
    setBorderRadius({
      ...borderRadius,
      topLeft: value,
      bottomRight: value,
    });
  };

  const changeBottomLeftTopRightRadius = (value: number) => {
    setBorderRadius({
      ...borderRadius,
      bottomLeft: value,
      topRight: value,
    });
  };

  const changeStyle = () => {
    if (style === Style.Monochrome) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em`,
        "background-color": `${color}`,
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    } else if (style === Style.Gradient) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em`,
        background: "transparent",
        "background-image": `linear-gradient(to right, ${color}1a, ${color}ae 4%, ${color}4d)`,
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    } else if (style === Style.Slanting || style === Style.Realistic) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        background: "transparent",
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    }
  };

  useEffect(() => {
    changeStyle();
  }, [style, color, margin, padding, borderRadius]);

  return (
    <main className="flex max-w-7xl flex-col items-center py-24 px-6 md:px-12 gap-12 m-auto">
      <div className="flex flex-col text-center gap-4">
        <H1>Text Highlighter</H1>
        <H2>Generate highlighter effect CSS code</H2>
      </div>
      <div className="flex flex-row items-center justify-around w-full gap-8 flex-wrap">
        <div className="flex flex-col items-center gap-12 max-w-[30rem]">
          <p className="text-4xl lg:text-5xl text-center">
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
          {/*<input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-64 p-2"
            style={{ color: "black" }}
          />*/}
          <CodeBlock
            css={css}
            slantingCss={slantingCss}
            realisticCss={realisticCss}
            style={style}
            color={color}
          />

          {style === Style.Realistic && (
            <div className="flex items-center px-6">
              <Alert className="flex flex-col">
                <AlertTitle>Note</AlertTitle>
                <div className="flex gap-2">
                  <AlertDescription>
                    You also need a filter for this style. Put it somewhere in
                    your HTML.
                  </AlertDescription>
                  <Button size="sm" onClick={copyFilterSvg}>
                    Copy
                  </Button>
                </div>
              </Alert>
            </div>
          )}
        </div>
        <Settings
          setStyle={setStyle}
          color={color}
          setColor={setColor}
          margin={margin}
          padding={padding}
          borderRadius={borderRadius}
          changeYMargin={changeYMargin}
          changeXMargin={changeXMargin}
          changeYPadding={changeYPadding}
          changeXPadding={changeXPadding}
          changeTopLeftBottomRightRadius={changeTopLeftBottomRightRadius}
          changeBottomLeftTopRightRadius={changeBottomLeftTopRightRadius}
        />
      </div>
    </main>
  );
}
