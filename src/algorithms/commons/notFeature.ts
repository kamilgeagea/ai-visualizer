/**
 * notFeature returns the other feature
 */

import { Feature } from "../../types";

interface NotFeatureParams {
  feature: Feature;
}

const notFeature = ({ feature }: NotFeatureParams): Feature =>
  feature === Feature.x ? Feature.y : Feature.x;

export default notFeature;
