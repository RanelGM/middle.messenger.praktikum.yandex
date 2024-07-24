import { getIconArrowCircle } from "./components/icon-arrow-circle";
import { getIconArrowTick } from "./components/icon-arrow-tick";
import { getIconCirclePoint } from "./components/icon-circle-point";
import { getIconClip } from "./components/icon-clip";
import { getIconCross } from "./components/icon-cross";
import { getIconKebab } from "./components/icon-kebab";
import { getIconSearch } from "./components/icon-search";
import { getIconSquareCorner } from "./components/icon-square-corner";
import { getIconSquareImage } from "./components/icon-square-image";
import { getIconTickDouble } from "./components/icon-tick-double";
import { getIconTickSingle } from "./components/icon-tick-single";

export const IconsMap = {
  ArrowCircle: getIconArrowCircle(),
  ArrowTick: getIconArrowTick(),
  CirclePoint: getIconCirclePoint(),
  Clip: getIconClip(),
  Cross: getIconCross(),
  Kebab: getIconKebab(),
  Search: getIconSearch(),
  SquareCorner: getIconSquareCorner(),
  SquareImage: getIconSquareImage(),
  TickDouble: getIconTickDouble(),
  TickSingle: getIconTickSingle(),
} as const;
