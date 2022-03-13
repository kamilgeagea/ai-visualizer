/**
 * Calculates Manhattan distance between two points
 */

import { DistanceParams, Log, LogRank } from "../../types";

const manhattanDistance = ({
  datasetPoint,
  point,
  steps,
  baseSteps,
  baseLogs,
}: DistanceParams): number => {
  // Extract coords from points
  const { x: x1, y: y1 } = datasetPoint.coords;
  const { x: x2, y: y2 } = point.coords;

  const distance = Math.abs(x2 - x1) + Math.abs(y2 - y1);

  const log: Log = {
    rank: LogRank.LOW,
    log: `distance with (${x1}, ${y1}) is ${distance.toFixed(2)}`,
  };

  if (baseLogs) {
    baseLogs.push(log);
  }

  steps.push({
    checkpoint: false,
    logs: [...steps[steps.length - 1].logs, log],
    objects: [
      ...baseSteps,
      {
        start: {
          x: Math.min(x1, x2),
          y: y1,
        },
        end: {
          x: Math.max(x1, x2),
          y: y1,
        },
        permanent: false,
      },
      {
        start: {
          x: x2,
          y: Math.min(y1, y2),
        },
        end: {
          x: x2,
          y: Math.max(y1, y2),
        },
        permanent: false,
      },
    ],
  });

  return distance;
};

export default manhattanDistance;
