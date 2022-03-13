/**
 * K Nearest Neighbors will attribute a label to an evaluation point based on its "k" nearest neighbors.
 * The neighbors vote to attribute the label and the largest number wins.
 */

import brute from "./brute";
import getUniformLabel from "./getUniformLabel";
import getWeightedLabel from "./getWeightedLabel";

import {
  DataPoint,
  Distance,
  DistancePoint,
  GraphObject,
  GraphPointType,
  LogRank,
  Step,
  Weights,
} from "../../types";
import { DEFAULT_STEP } from "../../constants";

interface KNNParams {
  steps: Step[];
  points: DataPoint[];
  dataset: DataPoint[];
  k: number;
  distance: Distance;
  weights: Weights;
}

const mapWeightToFunction: { [key: string]: (a: DistancePoint[]) => string } = {
  [Weights.UNIFORM]: getUniformLabel,
  [Weights.DISTANCE]: getWeightedLabel,
};

const knn = ({
  points,
  dataset,
  k,
  steps,
  distance,
  weights,
}: KNNParams): Step[] => {
  const baseSteps: GraphObject[] = [];

  steps.push(DEFAULT_STEP);

  // Sort dataset
  const data = dataset.sort((a, b) => a.coords.x - b.coords.x);

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const { coords } = point;

    steps.push({
      checkpoint: false,
      objects: [...baseSteps],
      logs: [
        ...steps[steps.length - 1].logs,
        {
          rank: LogRank.HIGH,
          log: `Point (${coords.x}, ${coords.y}):`,
        },
      ],
    });

    // Find the K Nearest Neighbors
    const neighbors = brute({
      point,
      dataset: data,
      k,
      steps,
      baseSteps,
      distance,
    });

    // Find the label that has the biggest count
    const label = mapWeightToFunction[weights](neighbors);

    const labeledPoint: GraphObject = {
      permanent: true,
      type: GraphPointType.LABEL,
      coords,
      color: label,
    };

    const labeledOutline: GraphObject = {
      permanent: true,
      type: GraphPointType.OUTLINE,
      coords,
      color: label,
    };

    steps.push({
      checkpoint: true,
      logs: [
        ...steps[steps.length - 1].logs,
        {
          rank: LogRank.MEDIUM,
          log: `Point (${point.coords.x}, ${point.coords.y}) has a label of ${label}.`,
        },
      ],
      objects: [...baseSteps, labeledPoint, labeledOutline],
    });

    baseSteps.push(labeledPoint, labeledOutline);
  }

  return steps;
};

export default knn;
