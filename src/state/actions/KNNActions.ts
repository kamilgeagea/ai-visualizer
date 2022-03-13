import ActionTypes from "../action-types";

import { DataPoint, Distance, PANEL_PAGES, Step, Weights } from "../../types";

interface SetKNNPanelPageAction {
  type: ActionTypes.SET_KNN_PANEL_PAGE;
  payload: PANEL_PAGES;
}

interface SetKNNLabelAction {
  type: ActionTypes.SET_KNN_LABEL;
  payload: string;
}

interface SetKNNLabelsAction {
  type: ActionTypes.SET_KNN_LABELS;
  payload: string[];
}

interface SetKNNLabelStorageAction {
  type: ActionTypes.SET_KNN_LABEL_STORAGE;
  payload: string[];
}

interface SetKNNErrorAction {
  type: ActionTypes.SET_KNN_ERROR;
  payload: string | null;
}

interface SetKNNDatasetSizeAction {
  type: ActionTypes.SET_KNN_DATASET_SIZE;
  payload: number;
}

interface SetKNNDatasetAction {
  type: ActionTypes.SET_KNN_DATASET;
  payload: DataPoint[];
}

interface SetKNNXAction {
  type: ActionTypes.SET_KNN_X;
  payload: number;
}

interface SetKNNYAction {
  type: ActionTypes.SET_KNN_Y;
  payload: number;
}

interface SetKNNPoints {
  type: ActionTypes.SET_KNN_POINTS;
  payload: DataPoint[];
}

interface SetKAction {
  type: ActionTypes.SET_K;
  payload: number;
}

interface SetKNNAnimationDurationAction {
  type: ActionTypes.SET_KNN_ANIMATION_DURATION;
  payload: number;
}

interface SetKNNDetailedAction {
  type: ActionTypes.SET_KNN_DETAILED;
  payload: boolean;
}

interface SetKNNStepsAction {
  type: ActionTypes.SET_KNN_STEPS;
  payload: Step[];
}

interface SetKNNStepAction {
  type: ActionTypes.SET_KNN_STEP;
  payload: number;
}

interface SetKNNPlayAction {
  type: ActionTypes.SET_KNN_PLAY;
  payload: boolean;
}

interface SetKNNParametersAction {
  type: ActionTypes.SET_KNN_PARAMETERS;
  payload: {
    datasetSize: number;
    k: number;
    weights: Weights;
    distance: Distance;
  };
}

export type KNNActions =
  | SetKNNPanelPageAction
  | SetKNNLabelAction
  | SetKNNLabelsAction
  | SetKNNLabelStorageAction
  | SetKNNErrorAction
  | SetKNNDatasetSizeAction
  | SetKNNDatasetAction
  | SetKNNXAction
  | SetKNNPoints
  | SetKNNYAction
  | SetKAction
  | SetKNNAnimationDurationAction
  | SetKNNDetailedAction
  | SetKNNStepsAction
  | SetKNNStepAction
  | SetKNNPlayAction
  | SetKNNParametersAction;
