/**
 * findCentroid calculates the centroid of a given set of points by calculating the mean of their coordinates
 */

import { Coords, DataPoint, Feature } from "../../types";

interface FindCentroidParams {
  points: DataPoint[];
  label: string;
}

const findCentroid = ({ points, label }: FindCentroidParams): DataPoint => {
  const n = points.length;
  let coords: Coords = {} as Coords;

  const features = Object.keys(Feature);
  // Iterate through each feature (coord)
  for (let i = 0; i < features.length; i++) {
    let sum = 0;
    const feature = features[i];

    // Calculate the sum of the points feature
    for (let i = 0; i < points.length; i++) {
      sum += points[i].coords[feature as Feature];
    }

    // Assign the mean to get the centroid coord
    coords[feature as Feature] = sum / n;
  }

  return { coords, label };
};

export default findCentroid;
