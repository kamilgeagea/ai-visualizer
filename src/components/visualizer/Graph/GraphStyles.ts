import { ComponentProps, CSSProperties } from "react";
import { VictoryAxis } from "victory";

import { COLOR_BASIC } from "../../../constants";

type VictoryAxisStyle = ComponentProps<typeof VictoryAxis>;

export const STROKE_WIDTH = 0.7;
export const STROKE_WIDTH_THICK = 1;

export const GRAPH_PADDING = 20;
export const POINT_SIZE = 4;
export const CENTROID_SIZE = 6;
export const OUTLINE_SIZE = 10;

export const { style: AXIS_STYLE }: VictoryAxisStyle = {
  style: {
    axis: { stroke: COLOR_BASIC, strokeWidth: 0.5 },
    ticks: { stroke: "transparent" },
    tickLabels: { fill: "transparent" },
  },
};

export const LINE_STYLE: CSSProperties = {
  strokeWidth: STROKE_WIDTH,
};
