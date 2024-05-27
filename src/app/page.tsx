"use client";

import { useEffect, useState } from "react";
import { H1 } from "@/components/ui/typography/h1";
import { H2 } from "@/components/ui/typography/h2";
import { useToast } from "@/components/ui/use-toast";
import CodeBlock from "@/components/codeBlock";
import { Style } from "@/models/style";
import Settings from "@/components/settings";
import Motto from "@/components/motto";
import { ToastAction } from "@/components/ui/toast";
import { filterSvg } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TailwindBlock from "@/components/tailwind-block";

export default function Home() {
  const { toast } = useToast();
  const [tab, setTab] = useState("css");
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
    "background-image": `linear-gradient(to right, ${color}1a, ${color}ae)`,
    "-webkit-box-decoration-break": "clone",
    "box-decoration-break": "clone",
  });

  const copyFilterSvg = async () => {
    await navigator.clipboard.writeText(filterSvg);
    toast({
      title: "Note",
      description: "Filter SVG copied to clipboard",
      duration: 2000,
    });
  };

  const changeStyle = () => {
    if (style === Style.Monochrome) {
      setCss({
        margin: `${margin.top}em ${margin.right}em`,
        padding: `${padding.top}em ${padding.right}em`,
        "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em`,
        "background-color": `${color}`,
        color: "currentColor",
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
        "background-image": `linear-gradient(to right, ${color}1a, ${color}ae)`,
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
      setTab("css");
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
        duration: 5000,
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
      <div className="flex flex-row items-start justify-around w-full gap-8 flex-wrap">
        <div className="flex flex-col items-center gap-12 max-w-[30rem]">
          <Motto style={style} color={color} css={css} />
          {/*<input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-64 p-2"
            style={{ color: "black" }}
          />*/}
          <Tabs defaultValue="css" value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="css">Raw CSS</TabsTrigger>
              <TabsTrigger value="tailwind" disabled={style === Style.Realistic}>
                Tailwind
              </TabsTrigger>
            </TabsList>
            <TabsContent value="css">
              <CodeBlock
                css={css}
                style={style}
                color={color}
                className="hidden lg:block"
              />
            </TabsContent>
            <TabsContent value="tailwind">
              <TailwindBlock
                css={css}
                style={style}
                color={color}
                className="hidden lg:block"
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex flex-wrap lg:flex-1 items-center justify-center gap-8 sm:flex-row-reverse max-w-[30rem] lg:mt-16">
          <Settings
            style={style}
            setStyle={setStyle}
            color={color}
            setColor={setColor}
            margin={margin}
            setMargin={setMargin}
            padding={padding}
            setPadding={setPadding}
            borderRadius={borderRadius}
            setBorderRadius={setBorderRadius}
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
