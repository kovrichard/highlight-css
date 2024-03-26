import { useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CssKey } from "./ui/typography/cssKey";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import { Style } from "@/models/style";

export default function CodeBlock({
  css,
  slantingCss,
  realisticCss,
  color,
  style,
}: Readonly<{
  css: Record<string, string>;
  slantingCss: Record<string, string>;
  realisticCss: Record<string, string>;
  color: string;
  style: Style;
}>) {
  const { toast } = useToast();
  const textAreaRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    const text = textAreaRef.current?.innerText;
    await navigator.clipboard.writeText(text!);
    toast({
      title: "Note",
      description: "Copied to clipboard",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={copyToClipboard}
          >
            <Image src="/copy.svg" width={24} height={24} alt="Copy" />
          </Button>
          <pre
            ref={textAreaRef}
            className="relative bg-black p-8 rounded-xl h-[22rem] overflow-y-scroll"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <code className="flex flex-col text-pretty text-white">
              <div>
                <span className="text-[#a6e22e]">.highlight</span>
                <span>{" {"}</span>
              </div>
              {(style === Style.Slanting || style === Style.Realistic) && (
                <div>
                  <CssKey>position</CssKey>
                  <span>relative;</span>
                </div>
              )}
              {Object.entries(css).map(([key, value]) => (
                <div key={key}>
                  <CssKey>{key}</CssKey>
                  <span>{value};</span>
                </div>
              ))}
              <span>{"}"}</span>
              {style === Style.Slanting && (
                <>
                  <span> </span>
                  <div>
                    <span className="text-[#a6e22e]">.highlight::after</span>
                    <span>{" {"}</span>
                  </div>
                  {Object.entries(slantingCss).map(([key, value]) => (
                    <div key={key}>
                      <CssKey>{key}</CssKey>
                      <span>{value};</span>
                    </div>
                  ))}
                  <div>
                    <CssKey>background-color</CssKey>
                    <span>{color};</span>
                  </div>
                  <span>{"}"}</span>
                </>
              )}
              {style === Style.Realistic && (
                <>
                  <span> </span>
                  <div>
                    <span className="text-[#a6e22e]">.highlight::after</span>
                    <span>{" {"}</span>
                  </div>
                  {Object.entries(realisticCss).map(([key, value]) => (
                    <div key={key}>
                      <CssKey>{key}</CssKey>
                      <span>{value};</span>
                    </div>
                  ))}
                  <div>
                    <CssKey>background-color</CssKey>
                    <span>{color};</span>
                  </div>
                  <span>{"}"}</span>
                </>
              )}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}