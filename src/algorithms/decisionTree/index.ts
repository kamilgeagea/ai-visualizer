/**
 * decisionTree recursively calls itself by calling finding the best split at each iteration, spliting the graph, then looking
 * for the next best split
 */

import findSplit from "./findSplit";
import getSplit from "./split";
import findLimits from "./findLimits";

import {
  CoordsLimits,
  Criterion,
  DataPoint,
  Line,
  Step,
  Splitter,
} from "../../types";

export interface DecisionTreeParams {
  steps: Step[];
  baseSteps: Line[];
  data: DataPoint[];
  limits: CoordsLimits;
  currentDepth: number;
  maxDepth: number;
  minSampleSplit: number;
  splitter: Splitter;
  criterion: Criterion;
}

const decisionTree = ({
  steps,
  baseSteps,
  data,
  limits,
  currentDepth,
  maxDepth,
  minSampleSplit,
  splitter,
  criterion,
}: DecisionTreeParams): Step[] | void => {
  // If max depth is not equal to none and we exceed it, don't go deeper
  if (maxDepth !== 0 && currentDepth > maxDepth) return;

  const split = findSplit({
    steps,
    baseSteps,
    data,
    limits,
    minSampleSplit,
    splitter,
    criterion,
  });

  if (split) {
    const { trueData, falseData } = getSplit({ data, split });
    const { trueLimits, falseLimits } = findLimits({
      split,
      currentLimits: limits,
    });

    decisionTree({
      steps,
      baseSteps,
      data: trueData,
      limits: trueLimits,
      currentDepth: currentDepth + 1,
      maxDepth,
      minSampleSplit,
      splitter,
      criterion,
    });
    decisionTree({
      steps,
      baseSteps,
      data: falseData,
      limits: falseLimits,
      currentDepth: currentDepth + 1,
      maxDepth,
      minSampleSplit,
      splitter,
      criterion,
    });
  }

  return steps;
};

export default decisionTree;
