/**
 * Removes label from label storage list
 */

import { MAX_LABEL_COUNT } from "../constants";

interface RemoveLabelFromStorageParams {
  label: string;
  labels: string[];
  labelStorage: string[];
}

const removeLabelFromStorageList = ({
  label,
  labels,
  labelStorage,
}: RemoveLabelFromStorageParams): string[] => {
  if (labels.length >= MAX_LABEL_COUNT)
    throw new Error("You've reached the maximum label count");

  // Check if label already in label list
  const labelMatch = labels.find((item) => label === item);
  if (labelMatch) throw new Error("Cannot add twice the same label");

  // Check if label in labels list. Remove it if it is the case
  const filteredLabels = labelStorage.filter((item) => label !== item);

  return filteredLabels;
};

export default removeLabelFromStorageList;
