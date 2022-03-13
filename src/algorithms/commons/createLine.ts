/**
 * Creates a Line
 */

import notFeature from "./notFeature";

import { Line, Coords, Feature, Split, CoordsLimits } from "../../types";

interface CreateLineParams {
  split: Split;
  limits: CoordsLimits;
  permanent: boolean;
}

const createLine = ({ split, limits, permanent }: CreateLineParams): Line => {
  // Extract the feature set by the split and use the helper notFeature function to get the other feature => x, y
  const feature = Object.keys(split)[0] as Feature;
  const otherFeature = notFeature({ feature });

  // If split is at x => [(split, minY), (split, maxY)]
  // else if split is at y => [(minX, split), (maxX, split)]
  return {
    start: {
      [feature]: split[feature],
      [otherFeature]: limits[otherFeature].min,
    } as Coords,
    end: {
      [feature]: split[feature],
      [otherFeature]: limits[otherFeature].max,
    } as Coords,
    permanent,
  };
};

export default createLine;
