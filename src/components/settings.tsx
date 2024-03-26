import { Style } from "@/models/style";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import Image from "next/image";

type SettingsProps = {
  setStyle: (value: Style) => void;
  color: string;
  setColor: (value: string) => void;
  margin: { [key: string]: number };
  padding: { [key: string]: number };
  borderRadius: { [key: string]: number };
  changeYMargin: (value: number) => void;
  changeXMargin: (value: number) => void;
  changeYPadding: (value: number) => void;
  changeXPadding: (value: number) => void;
  changeTopLeftBottomRightRadius: (value: number) => void;
  changeBottomLeftTopRightRadius: (value: number) => void;
};

export default function Settings({
  setStyle,
  color,
  setColor,
  margin,
  padding,
  borderRadius,
  changeYMargin,
  changeXMargin,
  changeYPadding,
  changeXPadding,
  changeTopLeftBottomRightRadius,
  changeBottomLeftTopRightRadius,
}: SettingsProps) {
  const onStyleChange = (value: Style) => {
    setStyle(value);
  };

  return (
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
                value={[margin.right]}
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
                value={[padding.right]}
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
                  value={[borderRadius.topRight]}
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
  );
}
