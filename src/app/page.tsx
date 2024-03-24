"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H1 } from "@/components/ui/typography/h1";
import { H2 } from "@/components/ui/typography/h2";
import { CssKey } from "@/components/ui/typography/cssKey";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

enum Style {
  Monochrome = "Monochrome",
  Gradient = "Gradient",
}

export default function Home() {
  const { toast } = useToast();
  const [text, setText] = useState("Seconds");
  const textAreaRef = useRef<HTMLPreElement>(null);
  const [style, setStyle] = useState<Style>(Style.Gradient);
  const [color, setColor] = useState<string>("#ffe100");
  const [margin, setMargin] = useState<{ [key: string]: number }>({
    top: 0,
    right: -0.4,
    bottom: 0,
    left: -0.4,
  });
  const [padding, setPadding] = useState<{ [key: string]: number }>({
    top: 0.1,
    right: 0.4,
    bottom: 0.1,
    left: 0.4,
  });
  const [borderRadius, setBorderRadius] = useState<{ [key: string]: number }>({
    topLeft: 0.8,
    topRight: 0.3,
    bottomLeft: 0.3,
    bottomRight: 0.8,
  });
  const [css, setCss] = useState<any>({
    margin: `${margin.top}em ${margin.right}em ${margin.bottom}em ${margin.left}em`,
    padding: `${padding.top}em ${padding.right}em ${padding.bottom}em ${padding.left}em`,
    "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em ${borderRadius.bottomRight}em ${borderRadius.bottomLeft}em`,
    background: "transparent",
    "background-image": `linear-gradient(to right, ${color}1a, ${color}ae 4%, ${color}4d)`,
    "-webkit-box-decoration-break": "clone",
    "box-decoration-break": "clone",
  });

  const copyToClipboard = async () => {
    const text = textAreaRef.current?.innerText;
    await navigator.clipboard.writeText(text!);
    toast({
      description: "Copied to clipboard",
    });
  };

  const changeXMargin = (value: number) => {
    setMargin({
      ...margin,
      left: value,
      right: value,
    });
  };

  const changeYMargin = (value: number) => {
    setMargin({
      ...margin,
      top: value,
      bottom: value,
    });
  };

  const changeXPadding = (value: number) => {
    setPadding({
      ...padding,
      left: value,
      right: value,
    });
  };

  const changeYPadding = (value: number) => {
    setPadding({
      ...padding,
      top: value,
      bottom: value,
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

  const onStyleChange = (value: Style) => {
    setStyle(value);
  };

  const changeStyle = () => {
    if (style === Style.Monochrome) {
      setCss({
        margin: `${margin.top}em ${margin.right}em ${margin.bottom}em ${margin.left}em`,
        padding: `${padding.top}em ${padding.right}em ${padding.bottom}em ${padding.left}em`,
        "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em ${borderRadius.bottomRight}em ${borderRadius.bottomLeft}em`,
        "background-color": `${color}`,
        "-webkit-box-decoration-break": "clone",
        "box-decoration-break": "clone",
      });
    } else {
      setCss({
        margin: `${margin.top}em ${margin.right}em ${margin.bottom}em ${margin.left}em`,
        padding: `${padding.top}em ${padding.right}em ${padding.bottom}em ${padding.left}em`,
        "border-radius": `${borderRadius.topLeft}em ${borderRadius.topRight}em ${borderRadius.bottomRight}em ${borderRadius.bottomLeft}em`,
        background: "transparent",
        "background-image": `linear-gradient(to right, ${color}1a, ${color}ae 4%, ${color}4d)`,
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
        <div className="flex flex-col items-center gap-14 max-w-[30rem]">
          <p className="text-4xl lg:text-5xl text-center">
            <span>Highlight Your Text</span>{" "}
            <span>
              in <mark style={css}>Seconds</mark> Here
            </span>
          </p>
          {/*<input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-64 p-2"
            style={{ color: "black" }}
          />*/}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
                <pre
                  ref={textAreaRef}
                  className="relative bg-black p-8 rounded-lg"
                >
                  <code className="flex flex-col text-pretty">
                    {Object.entries(css).map(([key, value]) => (
                      <div key={key}>
                        <CssKey>{key}</CssKey>
                        <span className="text-white">{value};</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="flex-1 max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-1 items-center w-full gap-4">
              <Label className="w-20">Style</Label>
              <Select
                defaultValue={Style.Gradient}
                onValueChange={(value) => onStyleChange(value as Style)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Style"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Style).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex flex-1 items-center w-full gap-4">
              <Label className="w-20">Color</Label>
              <div className="flex items-center w-full justify-around">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 p-1"
                />
                <span>or</span>
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
            <Separator />
            <div className="flex w-full items-center gap-4">
              <Label className="w-20">Margin</Label>
              <div className="flex w-full flex-col justify-around gap-2">
                <div className="flex gap-2">
                  <Image
                    src="/arrows-move-vertical.svg"
                    width={24}
                    height={24}
                    alt="Arrows up and down"
                  />
                  <Slider
                    value={[margin.top]}
                    min={-0.6}
                    max={1}
                    onValueChange={(value) => changeYMargin(value[0])}
                    step={0.1}
                  />
                </div>
                <div className="flex gap-2">
                  <Image
                    src="/arrows-move-horizontal.svg"
                    width={24}
                    height={24}
                    alt="Arrows left and right"
                  />
                  <Slider
                    value={[margin.left]}
                    min={-0.6}
                    max={1}
                    onValueChange={(value) => changeXMargin(value[0])}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex w-full items-center gap-4">
              <Label className="w-20">Padding</Label>
              <div className="flex w-full flex-col justify-around gap-2">
                <div className="flex gap-2">
                  <Image
                    src="/arrows-move-vertical.svg"
                    width={24}
                    height={24}
                    alt="Arrows up and down"
                  />
                  <Slider
                    value={[padding.top]}
                    min={0}
                    max={1}
                    onValueChange={(value) => changeYPadding(value[0])}
                    step={0.1}
                  />
                </div>
                <div className="flex gap-2">
                  <Image
                    src="/arrows-move-horizontal.svg"
                    width={24}
                    height={24}
                    alt="Arrows left and right"
                  />
                  <Slider
                    value={[padding.left]}
                    min={0}
                    max={1}
                    onValueChange={(value) => changeXPadding(value[0])}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex w-full items-center gap-4">
              <Label className="w-20">Border Radius</Label>
              <div className="flex justify-around w-full gap-4">
                <div className="flex w-full flex-col justify-around gap-2">
                  <div className="flex gap-2">
                    <div className="flex">
                      <Image
                        src="/radius-top-left.svg"
                        alt="Top left radius"
                        width={16}
                        height={16}
                        className="-mr-1 mb-2"
                      />
                      <Image
                        src="/radius-bottom-right.svg"
                        alt="Bottom right radius"
                        width={16}
                        height={16}
                        className="-ml-1 mt-2"
                      />
                    </div>
                    <Slider
                      value={[borderRadius.topLeft]}
                      min={0}
                      max={2}
                      onValueChange={(value) =>
                        changeTopLeftBottomRightRadius(value[0])
                      }
                      step={0.1}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex">
                      <Image
                        src="/radius-bottom-left.svg"
                        alt="Bottom left radius"
                        width={16}
                        height={16}
                        className="-mr-1 mt-2"
                      />
                      <Image
                        src="/radius-top-right.svg"
                        alt="Top right radius"
                        width={16}
                        height={16}
                        className="-ml-1 mb-2"
                      />
                    </div>
                    <Slider
                      value={[borderRadius.bottomLeft]}
                      min={0}
                      max={2}
                      onValueChange={(value) =>
                        changeBottomLeftTopRightRadius(value[0])
                      }
                      step={0.1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
