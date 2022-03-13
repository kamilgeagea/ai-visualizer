/**
 * Takes an object with labels and their counts.
 * Returns the label that has the largest count.
 */

import labelCounts from "../commons/labelCounts";

import { DistancePoint } from "../../types";

const getUniformLabel = (neighbors: DistancePoint[]): string => {
  // Get the points without distance
  const data = neighbors.map((neighbor) => neighbor.point);

  // Get the label counts
  const counts = labelCounts({ data });

  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};

export default getUniformLabel;
