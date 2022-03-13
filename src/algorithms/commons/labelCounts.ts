/**
 * labelCounts filters through the data in order to extract the counts of the different labels
 */

import { DataPoint } from "../../types";

interface LabelCountsParams {
  data: DataPoint[];
}

interface LabelCountsReturnType {
  [key: string]: number;
}

const labelCounts = ({ data }: LabelCountsParams): LabelCountsReturnType => {
  // The count object stores labels as keys and counts as values
  let counts: { [key: string]: number } = {};

  // Map the DataPoints array to extract only labels
  const labels = data.map(({ label }) => label);

  // Populate the counts object
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];

    if (label in counts) {
      counts[label]++;
    } else {
      counts[label] = 1;
    }
  }

  return counts;
};

export default labelCounts;
