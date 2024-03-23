"use client";

import { useRef, useState } from "react";
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

enum Style {
  Gradient = "Gradient",
}

export default function Home() {
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

  const copyToClipboard = async () => {
    const text = textAreaRef.current?.innerText;
    await navigator.clipboard.writeText(text!);
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

  return (
    <main className="flex max-w-7xl flex-col items-center p-24 gap-12 m-auto">
      <div className="flex flex-col items-center gap-4">
        <H1>Text Highlighter</H1>
        <H2>Generate highlighter effect CSS code</H2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around w-full">
        <div className="flex flex-col items-center gap-14 w-[30rem]">
          <p className="text-5xl text-center">
            <span>Highlight Your Text</span>{" "}
            <span>
              in{" "}
              <mark
                style={{
                  marginTop: `${margin.top}em`,
                  marginRight: `${margin.right}em`,
                  marginBottom: `${margin.bottom}em`,
                  marginLeft: `${margin.left}em`,
                  paddingTop: `${padding.top}em`,
                  paddingRight: `${padding.right}em`,
                  paddingBottom: `${padding.bottom}em`,
                  paddingLeft: `${padding.left}em`,
                  borderTopLeftRadius: `${borderRadius.topLeft}em`,
                  borderTopRightRadius: `${borderRadius.topRight}em`,
                  borderBottomLeftRadius: `${borderRadius.bottomLeft}em`,
                  borderBottomRightRadius: `${borderRadius.bottomRight}em`,
                  background: "transparent",
                  backgroundImage: `linear-gradient(to right, ${color}1a, ${color}ae 4%, ${color}4d)`,
                  WebkitBoxDecorationBreak: "clone",
                  boxDecorationBreak: "clone",
                }}
              >
                Seconds
              </mark>{" "}
              Here
            </span>
          </p>
          {/*<input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-64 p-2"
            style={{ color: "black" }}
          />*/}
          <div className="p-8 bg-card rounded-3xl shadow-lg">
            <div className="relative">
              <button
                className="absolute top-2 right-2 bg-green-700 rounded py-1 px-2 z-10"
                onClick={copyToClipboard}
              >
                Copy
              </button>
              <pre
                ref={textAreaRef}
                className="relative bg-black p-8 rounded-lg"
              >
                <code className="flex flex-col">
                  <div>
                    <CssKey>margin</CssKey>
                    <span className="text-white">
                      {margin.top}em {margin.right}em {margin.bottom}em{" "}
                      {margin.left}em;
                    </span>
                  </div>
                  <div>
                    <CssKey>padding</CssKey>
                    <span className="text-white">
                      {padding.top}em {padding.right}em {padding.bottom}em{" "}
                      {padding.left}em;
                    </span>
                  </div>
                  <div>
                    <CssKey>border-radius</CssKey>
                    <span className="text-white">
                      {borderRadius.topLeft}em {borderRadius.topRight}
                      em {borderRadius.bottomLeft}em {borderRadius.bottomRight}
                      em;
                    </span>
                  </div>
                  <div>
                    <CssKey>background</CssKey>
                    <span className="text-white">transparent;</span>
                  </div>
                  <div>
                    <CssKey>background-image</CssKey>
                    <span className="text-white">linear-gradient(</span>
                  </div>
                  <span className="text-white">{"  "}to right,</span>
                  <span className="text-white">{`  ${color}1a,`}</span>
                  <span className="text-white">{`  ${color}ae 4%,`}</span>
                  <span className="text-white">{`  ${color}4d`}</span>
                  <span className="text-white">);</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 bg-card rounded-3xl shadow-lg gap-6">
          <h2 className="text-2xl">Settings</h2>
          <div className="flex flex-1 items-center w-full gap-4">
            <Label className="w-20">Style</Label>
            <Select defaultValue={Style.Gradient}>
              <SelectTrigger>
                <SelectValue placeholder="Style"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Style.Gradient}>Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <label className="text-2xl">Border Radius</label>
          <div className="flex justify-around gap-4">
            {["topLeft", "topRight", "bottomLeft", "bottomRight"].map(
              (direction) => (
                <input
                  key={direction}
                  type="number"
                  step={0.2}
                  value={borderRadius[direction]}
                  onChange={(e) =>
                    setBorderRadius({
                      ...borderRadius,
                      [direction]: parseFloat(e.target.value),
                    })
                  }
                  className="w-16 p-2 text-slate-900"
                />
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
