import ActionTypes from "../action-types";

import { PANEL_PAGES, DataPoint, Criterion, Step, Splitter } from "../../types";

interface SetDTPanelScreenAction {
  type: ActionTypes.SET_DT_PANEL_PAGE;
  payload: PANEL_PAGES;
}

interface SetDTLabelInputAction {
  type: ActionTypes.SET_DT_LABEL_INPUT;
  payload: string;
}

interface SetDTLabelsAction {
  type: ActionTypes.SET_DT_LABELS;
  payload: string[];
}

interface SetDTLabelStorageAction {
  type: ActionTypes.SET_DT_LABEL_STORAGE;
  payload: string[];
}

interface SetDTErrorAction {
  type: ActionTypes.SET_DT_ERROR;
  payload: string | null;
}

interface SetDTDatasetSizeAction {
  type: ActionTypes.SET_DT_DATASET_SIZE;
  payload: number;
}

interface SetDTDatasetAction {
  type: ActionTypes.SET_DT_DATASET;
  payload: DataPoint[];
}

interface SetDTCriterionAction {
  type: ActionTypes.SET_CRITERION;
  payload: Criterion;
}

interface SetDTMaxDepthAction {
  type: ActionTypes.SET_MAX_DEPTH;
  payload: number;
}

interface SetDTMinSampleSplitAction {
  type: ActionTypes.SET_MIN_SAMPLE_SPLIT;
  payload: number;
}

interface SetDTSplitterAction {
  type: ActionTypes.SET_SPLITTER;
  payload: Splitter;
}

interface SetDTAnimationDurationAction {
  type: ActionTypes.SET_DT_ANIMATION_DURATION;
  payload: number;
}

interface SetDTAnimationDetailedAction {
  type: ActionTypes.SET_DT_ANIMATION_DETAILED;
  payload: boolean;
}

interface SetDTStepsAction {
  type: ActionTypes.SET_DT_STEPS;
  payload: Step[];
}

interface SetDTStepAction {
  type: ActionTypes.SET_DT_STEP;
  payload: number;
}

interface SetDTPlayAction {
  type: ActionTypes.SET_DT_PLAY;
  payload: boolean;
}

interface SetDTParametersAction {
  type: ActionTypes.SET_DT_PARAMETERS;
  payload: {
    datasetSize: number;
    maxDepth: number;
    minSampleSplit: number;
    criterion: Criterion;
    splitter: Splitter;
    play: boolean;
  };
}

export type DTActions =
  | SetDTPanelScreenAction
  | SetDTLabelInputAction
  | SetDTLabelsAction
  | SetDTLabelStorageAction
  | SetDTErrorAction
  | SetDTDatasetSizeAction
  | SetDTDatasetAction
  | SetDTCriterionAction
  | SetDTMaxDepthAction
  | SetDTMinSampleSplitAction
  | SetDTSplitterAction
  | SetDTAnimationDurationAction
  | SetDTAnimationDetailedAction
  | SetDTStepsAction
  | SetDTStepAction
  | SetDTPlayAction
  | SetDTParametersAction;
