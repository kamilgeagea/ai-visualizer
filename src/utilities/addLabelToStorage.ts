/**
 * Adds label to storage when removed from the labels list
 */

import { LABEL_COLORS, MIN_LABEL_COUNT } from "../constants";

interface AddLabelToStorageParams {
  label: string;
  labels: string[];
  labelStorage: string[];
}

const addLabelToStorage = ({
  label,
  labelStorage,
  labels,
}: AddLabelToStorageParams): string | undefined => {
  if (labels.length <= MIN_LABEL_COUNT)
    throw new Error(
      `There must be at least ${MIN_LABEL_COUNT} label${
        // @ts-ignore -- Keep in case MIN_LABEL_COUNT changes
        MIN_LABEL_COUNT !== 1 ? "s" : ""
      }`
    );

  // Check if label removed in storage
  const labelMatch = LABEL_COLORS.find((item) => item === label);

  return labelMatch;
};

export default addLabelToStorage;
