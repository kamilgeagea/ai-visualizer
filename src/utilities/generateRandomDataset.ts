/**
 * Generates n random datapoints
 */

import { randomNumberBetweenInterval } from ".";

import { DataPoint } from "../types";
import { MAX_COORD, MIN_COORD } from "../constants";

interface GenerateRandomDatasetParams {
  size: number;
  labels: string[];
}

const generateRandomDataset = ({
  size,
  labels,
}: GenerateRandomDatasetParams): DataPoint[] => {
  const data: DataPoint[] = [];

  // Generate a random point and add it to the array for each iteration of the size
  for (let i = 0; i < size; i++) {
    const x = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const y = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const index = randomNumberBetweenInterval(0, labels.length - 1);

    data.push({
      coords: { x, y },
      label: labels[index],
    });
  }

  return data;
};

export default generateRandomDataset;
