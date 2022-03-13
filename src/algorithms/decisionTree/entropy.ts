/**
 * entropy calculates the impurity of a dataset based on the labels
 */

import labelCounts from "../commons/labelCounts";

import { DataPoint } from "../../types";

interface EntropyParams {
  data: DataPoint[];
}

const entropy = ({ data }: EntropyParams) => {
  // Extract label counts using the helper function
  const counts = labelCounts({ data });

  let entropy = 0;

  // Sum entropy with all the labels probability multiplied by the log(2) of said probability
  for (let label in counts) {
    const labelProbability = counts[label] / data.length;
    entropy -= (labelProbability * Math.log(labelProbability)) / Math.log(2);
  }

  return entropy;
};

export default entropy;
