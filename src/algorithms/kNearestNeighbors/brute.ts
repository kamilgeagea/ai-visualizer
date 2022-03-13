/**
 * The brute algorithm finds the nearest neighbor by calculating the distance with all the neighbors and choosing the
 * closest one.
 */

import { mapDistanceTypeToFunction } from "../../constants";
import {
  DataPoint,
  GraphObject,
  GraphPoint,
  GraphPointType,
  Step,
  Distance,
  DistancePoint,
  Log,
  LogRank,
} from "../../types";

interface BruteParams {
  steps: Step[];
  baseSteps: GraphObject[];
  point: DataPoint;
  dataset: DataPoint[];
  k: number;
  distance: Distance;
}

const brute = ({
  point,
  dataset,
  k,
  steps,
  baseSteps,
  distance,
}: BruteParams): DistancePoint[] => {
  const distances: DistancePoint[] = [];

  for (let i = 0; i < dataset.length; i++) {
    // Calculate the eucledian distance of the point from the dataset to the point we need to evaluate
    const distanceValue = mapDistanceTypeToFunction[distance]({
      point,
      datasetPoint: dataset[i],
      steps,
      baseSteps,
    });

    // Add the dataset point and its distance to the evaluation point
    distances.push({
      point: dataset[i],
      distance: distanceValue,
    });
  }

  const neighbors = distances
    .sort((a, b) => a.distance - b.distance) // Sort the distances from smallest to biggest
    .slice(0, k) // Take the k nearest points
    .map((item, index) => {
      const { point, distance } = item;

      const object: GraphPoint = {
        permanent: false,
        type: GraphPointType.OUTLINE,
        coords: point.coords,
      };

      const logs: Log[] = [];

      if (index === 0) {
        logs.push(
          {
            rank: LogRank.LOW,
            log: "&emsp;",
          },
          {
            rank: LogRank.LOW,
            log: `\nThe ${k} nearest neighbors are:`,
          },
          {
            rank: LogRank.LOW,
            log: "&emsp;",
          }
        );
      }

      logs.push({
        rank: LogRank.LOW,
        log: `&emsp;${index + 1} - (${point.coords.x}, ${
          point.coords.y
        }) with a distance of ${distance.toFixed(2)}`,
      });

      if (index === k - 1) {
        logs.push({
          rank: LogRank.LOW,
          log: "&emsp;",
        });
      }

      steps.push({
        checkpoint: true,
        logs: [...steps[steps.length - 1].logs, ...logs],
        objects: [...baseSteps, object],
      });

      return item;
    }); // Only extract the points

  return neighbors;
};

export default brute;
