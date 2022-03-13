/**
 * split splits the data in two parts (right and left) based on a split value
 */

import { DataPoint, Feature, Split } from "../../types";

interface SplitParams {
  data: DataPoint[];
  split: Split;
}

interface SplitReturnType {
  trueData: DataPoint[];
  falseData: DataPoint[];
}

const split = ({ data, split }: SplitParams): SplitReturnType => {
  // Define true and false arrays
  const trueData: DataPoint[] = [];
  const falseData: DataPoint[] = [];

  // Extract feature and value from split
  const feature = Object.keys(split)[0] as Feature;
  const value = split[feature] as number;

  // Add the data points to either the left or the right arrays depending on the feature value
  for (let i = 0; i < data.length; i++) {
    if (data[i].coords[feature] <= value) {
      trueData.push(data[i]);
    } else {
      falseData.push(data[i]);
    }
  }

  return { trueData, falseData };
};

export default split;
