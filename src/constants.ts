/**
 * File containing all constants used accross the application
 */

import eucledianDistance from "./algorithms/commons/eucledianDistance";
import manhattanDistance from "./algorithms/commons/manhattanDistance";
import { CoordsLimits, Distance, DistanceParams, Step } from "./types";

// Alert timeout
export const ALERT_TIMEOUT = 7000;

// Colors
export const COLOR_PRIMARY = "#4681e8";
export const COLOR_BASIC = "#949494";
export const COLOR_LIGHT = "#949494B3";
export const COLOR_EXTRA_LIGHT = "#C9C9C9";
export const COLOR_DARK = "#000";
export const COLOR_PURPLE = "#AAB2FF";

// Icon Sizes
export const ICON_SIZE_EXTRA_SMALL = 12;
export const ICON_SIZE = 22;

// Input
export const MAX_INPUT_DIGITS = 2;

// Dataset
export const LABEL_COLORS: string[] = [
  "#7cf7ff",
  "#7ca1ff",
  "#227ec0",
  "#a67cff",
  "#33dbc7",
  "#ff847c",
];
export const MAX_LABEL_COUNT = LABEL_COLORS.length - 1;
export const MIN_LABEL_COUNT = 2;
export const INITIAL_LABEL_COUNT = MIN_LABEL_COUNT;

export const DEFAULT_DATASET_SIZE = 30;
export const MIN_DATASET_SIZE = 2;
export const MAX_DATASET_SIZE = 99;
export const UNLABELED_COLOR = COLOR_EXTRA_LIGHT;
export const RESERVED_COLORS = [UNLABELED_COLOR];

// Graph
export const MIN_COORD = 0;
export const MAX_COORD = 99;

export const DEFAULT_STEP: Step = {
  checkpoint: true,
  objects: [],
  logs: [],
};

// Common
export const mapDistanceTypeToFunction: {
  [key: string]: (params: DistanceParams) => number;
} = {
  [Distance.EUCLIDEAN]: eucledianDistance,
  [Distance.MANHATTAN]: manhattanDistance,
};

// Decision Tree
export const MIN_MIN_SAMPLE_SPLIT = 2;
export const DEFAULT_MIN_SAMPLE_SPLIT = MIN_MIN_SAMPLE_SPLIT;

export const DEFAULT_LIMITS: CoordsLimits = {
  x: {
    min: MIN_COORD,
    max: MAX_COORD,
  },
  y: {
    min: MIN_COORD,
    max: MAX_COORD,
  },
};
export const DEFAULT_INFORMATION_GAIN = 0;

// KNN
export const DEFAULT_X = 50;
export const DEFAULT_Y = 50;
export const DEFAULT_K = Math.round(DEFAULT_DATASET_SIZE / 3);
export const MIN_K = 1;

// Animation
export const MIN_ANIMATION_DURATION = 50;
export const MAX_ANIMATION_DURATION = 1000;
export const DEFAULT_ANIMATION_DURATION = 300;
export const ANIMATION_SLIDER_STEP = 10;
