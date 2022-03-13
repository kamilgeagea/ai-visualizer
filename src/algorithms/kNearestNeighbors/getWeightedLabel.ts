/**
 * Returns the best label based on K nearest points
 * The closer the point the bigger the impact on the label decision via inverse relationship
 */

import { DistancePoint } from "../../types";

const getWeightedLabel = (neighbors: DistancePoint[]): string => {
  // Create a label / weight dictionary
  const labelWeights: { [key: string]: number } = {};

  for (let i = 0; i < neighbors.length; i++) {
    const {
      point: { label },
      distance,
    } = neighbors[i];

    if (!(label in labelWeights)) {
      labelWeights[label] = 0;
    }

    labelWeights[label] += 1 / distance;
  }

  // Pick the best label (highest weight) and return it
  return Object.keys(labelWeights).sort(
    (a, b) => labelWeights[b] - labelWeights[a]
  )[0];
};

export default getWeightedLabel;
