/**
 * findLimits will return the new limits (left and right) set by a split
 */

import { CoordsLimits, Feature, Split } from "../../types";

interface FindLimitsParams {
  currentLimits: CoordsLimits;
  split: Split;
}

interface FindLimitsReturnType {
  trueLimits: CoordsLimits;
  falseLimits: CoordsLimits;
}

const findLimits = ({
  currentLimits,
  split,
}: FindLimitsParams): FindLimitsReturnType => {
  // Extract the feature from the split
  const feature = Object.keys(split)[0] as Feature;

  // Create the true and false limits set by the split
  const trueLimits = {
    ...currentLimits,
    [feature]: {
      min: currentLimits[feature].min,
      max: split[feature],
    },
  } as CoordsLimits;

  const falseLimits = {
    ...currentLimits,
    [feature]: {
      min: split[feature],
      max: currentLimits[feature].max,
    },
  } as CoordsLimits;

  return { trueLimits, falseLimits };
};

export default findLimits;
