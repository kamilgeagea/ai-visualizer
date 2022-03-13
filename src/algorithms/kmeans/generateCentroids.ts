/**
 * generateCentroids will create a random centroid for each label passed in the labels array
 */

import { randomNumberBetweenInterval } from "../../utilities";

import { MAX_COORD, MIN_COORD } from "../../constants";
import { Centroids } from "../../types";

interface GenerateCentroidsParams {
  labels: string[];
}

const generateCentroids = ({ labels }: GenerateCentroidsParams): Centroids => {
  let centroids: Centroids = {};

  for (let i = 0; i < labels.length; i++) {
    const x = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const y = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const label = labels[i];

    centroids[label] = {
      coords: { x, y },
      label,
    };
  }

  return centroids;
};

export default generateCentroids;
