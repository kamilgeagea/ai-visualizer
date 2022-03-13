/**
 * Calculates the Eucledian Distance between two points
 */

import { DistanceParams, Log, LogRank } from "../../types";

const eucledianDistance = ({
  datasetPoint,
  point,
  steps,
  baseSteps,
  baseLogs,
}: DistanceParams): number => {
  // Extract coords from points
  const { x: x1, y: y1 } = datasetPoint.coords;
  const { x: x2, y: y2 } = point.coords;

  const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

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
        start: datasetPoint.coords,
        end: point.coords,
        permanent: false,
      },
    ],
  });

  // Return Eucledian Distance
  return distance;
};

export default eucledianDistance;
