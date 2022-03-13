/**
 * findSplit will loop between a set of coordinates and create a candidate split between each points
 * The function will return the best split (the split that has the most info gain)
 */

import split from "./split";
import informationGain, { mapCriterionToFunction } from "./informationGain";
import createLine from "../commons/createLine";

import {
  CoordsLimits,
  Criterion,
  DataPoint,
  Feature,
  Log,
  LogRank,
  Split,
  Splitter,
  Step,
  Line,
} from "../../types";
import { randomNumberBetweenInterval } from "../../utilities";

interface findSplitParams {
  steps: Step[];
  baseSteps: Line[];
  data: DataPoint[];
  limits: CoordsLimits;
  minSampleSplit: number;
  splitter: Splitter;
  criterion: Criterion;
}

interface SplitDataStructure {
  split: Split;
  feature: Feature;
  gain: number;
}

const findSplit = ({
  steps,
  baseSteps,
  data,
  limits,
  minSampleSplit,
  splitter,
  criterion,
}: findSplitParams): Split | void => {
  // If the length of the data is less than the minimum split, don't execute the split
  if (data.length < minSampleSplit) return;

  // Keep track of each split with its gain
  const splits: SplitDataStructure[] = [];

  const features = Object.values(Feature);
  const currentUncertainty = mapCriterionToFunction[criterion]({ data });

  // A current uncertainty of 0 means that all the points in the current split have the same label,
  // no need to effectuate another split
  if (currentUncertainty === 0) return;

  // Iterate through the features and execute a split at each point's feature
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const points = Array.from(
      new Set(data.map(({ coords }) => coords[feature]))
    ).sort((a, b) => a - b);

    for (let j = 0; j < points.length - 1; j++) {
      const value = (points[j] + points[j + 1]) / 2;

      const candidateSplit: Split = {
        [feature]: value,
      } as unknown as Split;

      const { trueData, falseData } = split({ data, split: candidateSplit });

      // If the candidate split is the best split so far, implement it as new best split
      const gain = informationGain({
        trueData,
        falseData,
        currentUncertainty,
        criterion,
      });

      // Create the line at the current split
      const candidateLine: Line = createLine({
        split: candidateSplit,
        limits,
        permanent: false,
      });

      // Add the split to the steps array
      const logs: Log[] = [...steps[steps.length - 1].logs];

      // Write the current space we're working in at the beginning
      if (i === 0 && j === 0) {
        logs.push({
          rank: LogRank.HIGH,
          log: `For x in [${limits.x.min}, ${limits.x.max}] and y in [${limits.y.min}, ${limits.y.max}]:`,
        });
      }

      logs.push({
        rank: LogRank.LOW,
        log: `Split at ${feature} = ${value} has a gain of ${gain.toFixed(2)}`,
      });

      steps.push({
        checkpoint: false,
        objects: [...baseSteps, candidateLine],
        logs,
      });

      // If the candidate split has a gain better than 0, it means that the split is working,
      // we add it to the splits array
      if (gain > 0) {
        splits.push({
          split: candidateSplit,
          feature,
          gain,
        });
      }
    }
  }

  // If the splits array contains elements, return a split based on splitter
  if (splits.length > 0) {
    let chosenSplit: SplitDataStructure;

    if (splitter === Splitter.BEST) {
      // Sort splits in a descending order and pick the best one (1st one)
      chosenSplit = splits.sort((a, b) => b.gain - a.gain)[0];
    } else {
      // Pick a random split from the splits array
      const index = randomNumberBetweenInterval(0, splits.length - 1);
      chosenSplit = splits[index];
    }

    const line = createLine({
      split: chosenSplit.split,
      limits,
      permanent: true,
    });

    steps.push({
      checkpoint: true,
      objects: [...baseSteps, line],
      logs: [
        ...steps[steps.length - 1].logs,
        {
          rank: LogRank.MEDIUM,
          log: `The chosen split is ${chosenSplit.feature} = ${
            chosenSplit.split[chosenSplit.feature]
          } with a gain of ${chosenSplit.gain.toFixed(2)}`,
        },
      ],
    });

    baseSteps.push(line);

    return chosenSplit.split;
  }
};

export default findSplit;
