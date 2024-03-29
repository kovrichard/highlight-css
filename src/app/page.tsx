"use client";

import { useEffect, useState } from "react";
import { H1 } from "@/components/ui/typography/h1";
import { H2 } from "@/components/ui/typography/h2";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeBlock from "@/components/codeBlock";
import { Style } from "@/models/style";
import Settings from "@/components/settings";
import Motto from "@/components/motto";
import { ToastAction } from "@/components/ui/toast";

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
    color: "currentColor",
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
        "color": "currentColor",
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    } else if (style === Style.Gradient) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em`,
        background: "transparent",
        color: "currentColor",
        "background-image": `linear-gradient(to right, ${color}1a, ${color}ae 4%, ${color}4d)`,
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    } else if (style === Style.Slanting) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        background: "transparent",
        color: "currentColor",
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    } else if (style === Style.Realistic) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        background: "transparent",
        color: "currentColor",
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
      toast({
        title: "Note",
        description:
          "You also need a filter for this style. Put it somewhere in your HTML.",
        action: (
          <ToastAction
            onClick={copyFilterSvg}
            altText="Copy the SVG from the code block"
          >
            Copy
          </ToastAction>
        ),
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
          <Motto style={style} color={color} css={css} />
          {/*<input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-64 p-2"
            style={{ color: "black" }}
          />*/}
          <CodeBlock
            css={css}
            style={style}
            color={color}
            className="hidden lg:block"
          />
        </div>
        <div className="flex flex-wrap lg:flex-1 items-center justify-center gap-8 sm:flex-row-reverse max-w-[30rem]">
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
          <CodeBlock
            css={css}
            style={style}
            color={color}
            className="lg:hidden"
          />
        </div>
      </div>
    </main>
  );
}
