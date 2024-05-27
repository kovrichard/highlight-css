import { Style } from "@/models/style";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { toast } from "./ui/use-toast";
import { filterSvg, realisticCss, slantingCss } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import FileTypeSvg from "./icons/file-type-svg";
import Copy from "./icons/copy";
import { ScrollArea } from "./ui/scroll-area";

export default function TailwindBlock({
  css,
  color,
  style,
  className = "",
}: Readonly<{
  css: Record<string, string>;
  color: string;
  style: Style;
  className?: string;
}>) {
  const textAreaRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    const text = textAreaRef.current?.innerText;
    await navigator.clipboard.writeText(text!);
    toast({
      title: "Note",
      description: "CSS copied to clipboard",
      duration: 2000,
    });
  };

  const copyFilterSvg = async () => {
    await navigator.clipboard.writeText(filterSvg);
    toast({
      title: "Note",
      description: "Filter SVG copied to clipboard",
      duration: 2000,
    });
  };
  return (
    <Card className={cn("max-w-[28rem]", className)}>
      <CardContent className="p-6 text-sm sm:text-base">
        <div className="relative">
          <TooltipProvider>
            {style === Style.Realistic && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    id="copy-filter-svg"
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-14 z-10"
                    onClick={copyFilterSvg}
                  >
                    <FileTypeSvg />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Filter SVG</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  id="copy-css-code"
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={copyToClipboard}
                >
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy CSS Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ScrollArea className="h-96 rounded-xl bg-black">
            <pre ref={textAreaRef} className="relative p-8">
              <code className="flex flex-col text-pretty text-white">
                <div>
                  {(style === Style.Slanting || style === Style.Realistic) && (
                    <>
                      <span>relative</span>{" "}
                    </>
                  )}
                  {Object.entries(css).map(([key, value]) => {
                    if (key === "margin") {
                      return (
                        <>
                          <span>my-[{value.split(" ")[0]}] </span>
                          <span>mx-[{value.split(" ")[1]}] </span>
                        </>
                      );
                    } else if (key === "padding") {
                      return (
                        <>
                          <span>py-[{value.split(" ")[0]}] </span>
                          <span>px-[{value.split(" ")[1]}] </span>
                        </>
                      );
                    } else if (key === "border-radius") {
                      return (
                        <>
                          <span>rounded-tl-[{value.split(" ")[0]}] </span>
                          <span>rounded-tr-[{value.split(" ")[1]}] </span>
                          <span>rounded-br-[{value.split(" ")[0]}] </span>
                          <span>rounded-bl-[{value.split(" ")[1]}] </span>
                        </>
                      );
                    } else if (key === "background") {
                      return <span key={key}>bg-{value} </span>;
                    } else if (key === "background-color") {
                      return <span key={key}>bg-[{value}] </span>;
                    } else if (key === "color") {
                      return <span key={key}>text-[{value}] </span>;
                    } else if (key === "background-image") {
                      return (
                        <>
                          <span>bg-gradient-to-r </span>
                          <span>
                            from-[{value.split(" ")[2].slice(0, -1)}]{" "}
                          </span>
                          <span>to-[{value.split(" ")[3]}] </span>
                        </>
                      );
                    }
                  })}
                  {style === Style.Slanting &&
                    Object.entries(slantingCss).map(([key, value]) => {
                      if (key === "content") {
                        return <span key={key}>after:content-[{value}] </span>;
                      } else if (key === "position") {
                        return <span key={key}>after:{value} </span>;
                      } else if (key === "width") {
                        return (
                          <span key={key}>
                            after:w-[{value.replace(/\s/g, "")}]{" "}
                          </span>
                        );
                      } else if (key === "height") {
                        return <span key={key}>after:h-[{value}] </span>;
                      } else if (key === "left") {
                        return <span key={key}>after:left-[{value}] </span>;
                      } else if (key === "bottom") {
                        return <span key={key}>after:bottom-[{value}] </span>;
                      } else if (key === "z-index") {
                        return <span key={key}>after:z-[{value}] </span>;
                      } else if (key === "transform") {
                        return (
                          <span key={key}>
                            after:rotate-[{value.substring(7, 12)}]{" "}
                          </span>
                        );
                      }
                    })}
                  <span>after:bg-[{color}]</span>
                </div>
              </code>
            </pre>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
