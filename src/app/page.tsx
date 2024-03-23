"use client";

import { useRef, useState } from "react";

enum Style {
  Gradient,
}

export default function Home() {
  const [text, setText] = useState("Hello World!");
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

  return (
    <main className="flex min-h-screen max-w-7xl flex-col items-center p-24 gap-8 m-auto">
      <h1 className="text-4xl">Mark Highlighter</h1>
      <h2 className="text-2xl">Generate highlighter effect CSS code</h2>
      <div className="flex flex-col sm:flex-row items-center justify-around w-full">
        <div className="flex flex-col items-center gap-8">
          <p>
            <span className="text-3xl">Before</span>{" "}
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
                color: "white",
              }}
              className="text-3xl"
            >
              {text}
            </mark>{" "}
            <span className="text-3xl">after</span>
          </p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-64 p-2"
            style={{ color: "black" }}
          />
          <div className="p-8 bg-slate-500 rounded-2xl">
            <pre ref={textAreaRef} className="relative bg-black p-8 rounded-lg">
              <button
                className="absolute top-2 right-2 bg-green-700 rounded py-1 px-2"
                onClick={copyToClipboard}
              >
                Copy
              </button>
              <code className="flex flex-col">
                <div>
                  <span className="text-[#66d9ef]">margin:</span>{" "}
                  <span>
                    {margin.top}em {margin.right}em {margin.bottom}em{" "}
                    {margin.left}em;
                  </span>
                </div>
                <div>
                  <span className="text-[#66d9ef]">padding:</span>{" "}
                  <span>
                    {padding.top}em {padding.right}em {padding.bottom}em{" "}
                    {padding.left}em;
                  </span>
                </div>
                <div>
                  <span className="text-[#66d9ef]">border-radius:</span>{" "}
                  <span>
                    {borderRadius.topLeft}em {borderRadius.topRight}
                    em {borderRadius.bottomLeft}em {borderRadius.bottomRight}em;
                  </span>
                </div>
                <div>
                  <span className="text-[#66d9ef]">background:</span>{" "}
                  <span>transparent;</span>
                </div>
                <div>
                  <span className="text-[#66d9ef]">background-image:</span>{" "}
                  <span>linear-gradient(</span>
                </div>
                <span>{"  "}to right,</span>
                <span>{`  ${color}1a,`}</span>
                <span>{`  ${color}ae 4%,`}</span>
                <span>{`  ${color}4d`}</span>
                <span>);</span>
              </code>
            </pre>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 bg-slate-500 rounded-3xl">
          <h2 className="text-2xl">Settings</h2>
          <label className="text-2xl">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(parseInt(e.target.value))}
            className="w-64 p-2 text-slate-900"
          >
            <option value={Style.Gradient}>Gradient</option>
          </select>
          <div className="flex flex-col items-center p-8 bg-slate-500 rounded-3xl">
            <label className="text-2xl">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-8 h-8 p-0 border-4 border-slate-900"
                style={{ WebkitAppearance: "none" }}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <span>or</span>
              <input
                type="text"
                className="w-24 p-2 text-slate-900"
                placeholder="#000000"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <label className="text-2xl">Margin</label>
          <div className="flex justify-around gap-4">
            {["top", "right", "bottom", "left"].map((direction) => (
              <input
                key={direction}
                type="number"
                step={0.2}
                value={margin[direction]}
                onChange={(e) =>
                  setMargin({
                    ...margin,
                    [direction]: parseFloat(e.target.value),
                  })
                }
                className="w-16 p-2 text-slate-900"
              />
            ))}
          </div>
          <label className="text-2xl">Padding</label>
          <div className="flex justify-around gap-4">
            {["top", "right", "bottom", "left"].map((direction) => (
              <input
                key={direction}
                type="number"
                step={0.2}
                value={padding[direction]}
                onChange={(e) =>
                  setPadding({
                    ...padding,
                    [direction]: parseFloat(e.target.value),
                  })
                }
                className="w-16 p-2 text-slate-900"
              />
            ))}
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
