import ActionTypes from "../action-types";

import { DataPoint, Distance, PANEL_PAGES, Step } from "../../types";

interface SetKmeansPanelPageAction {
  type: ActionTypes.SET_KMEANS_PANEL_PAGE;
  payload: PANEL_PAGES;
}

interface SetKmeansLabelAction {
  type: ActionTypes.SET_KMEANS_LABEL;
  payload: string;
}

interface SetKmeansLabelsAction {
  type: ActionTypes.SET_KMEANS_LABELS;
  payload: string[];
}

interface SetKmeansLabelStorageAction {
  type: ActionTypes.SET_KMEANS_LABEL_STORAGE;
  payload: string[];
}

interface SetKmeansErrorAction {
  type: ActionTypes.SET_KMEANS_ERROR;
  payload: string | null;
}

interface SetKmeansDatasetSizeAction {
  type: ActionTypes.SET_KMEANS_DATASET_SIZE;
  payload: number;
}

interface SetKmeansDatasetAction {
  type: ActionTypes.SET_KMEANS_DATASET;
  payload: DataPoint[];
}

interface SetKmeansAnimationDurationAction {
  type: ActionTypes.SET_KMEANS_ANIMATION_DURATION;
  payload: number;
}

interface SetKmeansDetailedAction {
  type: ActionTypes.SET_KMEANS_DETAILED;
  payload: boolean;
}

interface SetKmeansStepsAction {
  type: ActionTypes.SET_KMEANS_STEPS;
  paylaod: Step[];
}

interface SetKmeansStepAction {
  type: ActionTypes.SET_KMEANS_STEP;
  payload: number;
}

interface SetKmeansPlayAction {
  type: ActionTypes.SET_KMEANS_PLAY;
  payload: boolean;
}

interface SetKmeansMaxIterationsAction {
  type: ActionTypes.SET_KMEANS_MAX_ITERATIONS;
  payload: number;
}

interface SetKmeansParametersAction {
  type: ActionTypes.SET_KMEANS_PARAMETERS;
  payload: {
    datasetSize: number;
    maxIteration: number;
    distance: Distance;
  };
}

export type KMeansActions =
  | SetKmeansPanelPageAction
  | SetKmeansLabelAction
  | SetKmeansLabelsAction
  | SetKmeansLabelStorageAction
  | SetKmeansErrorAction
  | SetKmeansDatasetSizeAction
  | SetKmeansDatasetAction
  | SetKmeansAnimationDurationAction
  | SetKmeansDetailedAction
  | SetKmeansStepsAction
  | SetKmeansStepAction
  | SetKmeansPlayAction
  | SetKmeansParametersAction
  | SetKmeansMaxIterationsAction;
