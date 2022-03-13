/**
 * KMeans will attribute a label to points from a certain dataset by placing labeled centroids and defining clusters
 */

import _ from "lodash";

import generateCentroids from "./generateCentroids";
import findCentroid from "./findCentroid";

import {
  Centroids,
  DataPoint,
  Distance,
  GraphObject,
  GraphPointType,
  Log,
  LogRank,
  Step,
} from "../../types";
import { mapDistanceTypeToFunction } from "../../constants";

interface KmeansParams {
  points: DataPoint[];
  labels: string[];
  steps: Step[];
  maxIterations: number;
  distance: Distance;
}

interface CentroidDistance {
  centroid: DataPoint;
  distance: number;
}

const kmeans = ({
  points,
  labels,
  steps,
  maxIterations,
  distance,
}: KmeansParams): Step[] => {
  // Generate k centroids where k is the length of the labels array
  let centroids = generateCentroids({ labels });
  let previousCentroids: Centroids | null = null;
  const sortedPoints = points.sort((a, b) => a.coords.x - b.coords.x);
  const baseLogs: Log[] = [];
  let currentIteration = 0;

  while (
    !_.isEqual(centroids, previousCentroids) &&
    (currentIteration < maxIterations || maxIterations === 0)
  ) {
    currentIteration++;

    const iterationPoints: DataPoint[] = [];

    const baseSteps: GraphObject[] = Object.keys(centroids).map((centroid) => ({
      permanent: false,
      type: GraphPointType.CENTROID,
      coords: centroids[centroid].coords,
      color: centroids[centroid].label,
    }));

    baseLogs.push(
      {
        rank: LogRank.HIGH,
        log: `Iteration ${currentIteration}`,
      },
      ...Object.keys(centroids).map((centroid) => ({
        rank: LogRank.LOW,
        log: `Initiating centroid at position (${centroids[
          centroid
        ].coords.x.toFixed(2)},${centroids[centroid].coords.y.toFixed(2)})
        with label ${centroids[centroid].label}`,
      })),
      {
        rank: LogRank.MEDIUM,
        log: `Centroids initiated`,
      }
    );

    steps.push({
      checkpoint: true,
      objects: [...baseSteps],
      logs: [...baseLogs],
    });

    // Step 1: Assign each point to its initial label
    for (let i = 0; i < sortedPoints.length; i++) {
      // For each point, find closest centroid and assign the centroid's label
      let closestCentroid: CentroidDistance | null = null;
      const point = sortedPoints[i];

      for (let label in centroids) {
        // For each centroid, calculate distance with point
        const centroid = centroids[label];

        const distanceToCentroid = mapDistanceTypeToFunction[distance]({
          datasetPoint: point,
          point: centroid,
          steps,
          baseSteps,
          baseLogs,
        });

        // Check if the new centroid is the closest point
        if (
          closestCentroid === null ||
          distanceToCentroid < closestCentroid.distance
        ) {
          closestCentroid = {
            centroid,
            distance: distanceToCentroid,
          };
        }
      }

      // Label the point the same as the closest centroid
      if (closestCentroid) {
        // TODO: add step to add point on map
        iterationPoints.push({
          coords: point.coords,
          label: closestCentroid.centroid.label,
        });

        const labeledPoint: GraphObject = {
          permanent: false,
          type: GraphPointType.LABEL,
          coords: point.coords,
          color: closestCentroid.centroid.label,
        };

        baseSteps.push(labeledPoint);
        baseLogs.push({
          rank: LogRank.MEDIUM,
          log: `The closest centroid is (${closestCentroid.centroid.coords.x.toFixed(
            2
          )},
            ${closestCentroid.centroid.coords.y.toFixed(2)}) with a label of ${
            closestCentroid.centroid.label
          },
            point (${point.coords.x.toFixed(2)},${point.coords.y.toFixed(
            2
          )}) is assigned with label
            ${closestCentroid.centroid.label} \n`,
        });

        steps.push({
          checkpoint: true,
          objects: [...baseSteps],
          logs: [...baseLogs],
        });
      }
    }

    // Assign the centroids to the previousCentroids variable before mutating it
    previousCentroids = _.cloneDeep(centroids);

    // Change the position of the centroids based on each cluster's center
    for (let label in centroids) {
      // Only filter the points belonging to the current cluster
      const labelPoints = iterationPoints.filter(
        (point) => point.label === label
      );

      // Calculate the new centroid poisition and replace it
      const newCentroid = findCentroid({ points: labelPoints, label });
      centroids[label] = newCentroid;
    }
  }

  return steps;
};

export default kmeans;
