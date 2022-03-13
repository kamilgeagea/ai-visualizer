/**
 * gini calculates the gini impurity coefficient with a given dataset.
 */

import labelCounts from "../commons/labelCounts";

import { DataPoint } from "../../types";

interface GiniParams {
  data: DataPoint[];
}

const gini = ({ data }: GiniParams): number => {
  // Extract label counts using the helper function
  const counts = labelCounts({ data });

  let impurity = 1;

  // Substract impurity with every label probability
  for (let label in counts) {
    const labelProbability = counts[label] / data.length;
    impurity -= labelProbability ** 2;
  }

  return impurity;
};

export default gini;
