/**
 * informationGain calculates how much info a split provide to the model
 */

import gini from "./gini";
import entropy from "./entropy";

import { Criterion, DataPoint } from "../../types";

export const mapCriterionToFunction: {
  [key in Criterion]: ({ data }: { data: DataPoint[] }) => number;
} = {
  [Criterion.GINI]: gini,
  [Criterion.ENTROPY]: entropy,
};

interface InformationGainParams {
  trueData: DataPoint[];
  falseData: DataPoint[];
  currentUncertainty: number;
  criterion: Criterion;
}

const informationGain = ({
  trueData,
  falseData,
  currentUncertainty,
  criterion,
}: InformationGainParams): number => {
  const uncertainty = mapCriterionToFunction[criterion];

  // Probability of true data
  const p = trueData.length / (trueData.length + falseData.length);

  // Information gain formula
  return (
    currentUncertainty -
    p * uncertainty({ data: trueData }) -
    (1 - p) * uncertainty({ data: falseData })
  );
};

export default informationGain;
