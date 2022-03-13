/**
 * Generates n unlabeled random datapoints
 */

import { randomNumberBetweenInterval } from ".";

import { DataPoint } from "../types";
import { MAX_COORD, MIN_COORD, UNLABELED_COLOR } from "../constants";

interface GenerateUnlabeledRandomDatasetParams {
  size: number;
}

const generateUnlabeledRandomDataset = ({
  size,
}: GenerateUnlabeledRandomDatasetParams): DataPoint[] => {
  const data: DataPoint[] = [];

  // Generate a random unlabeled data point for each iteration
  for (let i = 0; i < size; i++) {
    const x = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const y = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);

    data.push({
      coords: { x, y },
      label: UNLABELED_COLOR,
    });
  }

  return data;
};

export default generateUnlabeledRandomDataset;
