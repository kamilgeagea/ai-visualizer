import { Dispatch } from "react";

import createDataContext from "../createDataContext";

import { decisionTree } from '../../algorithms';
import { randomNumberBetweenInterval, clamp } from '../../utilities';

import ActionTypes from "../action-types";
import { Actions } from "../actions";
import { PANEL_PAGES, DataPoint, Criterion, Step, Splitter } from '../../types';
import {
  LABEL_COLORS,
  INITIAL_LABEL_COUNT,
  MAX_LABEL_COUNT,
  MIN_LABEL_COUNT,
  DEFAULT_DATASET_SIZE,
  ALERT_TIMEOUT,
  MIN_COORD,
  MAX_COORD,
  DEFAULT_MIN_SAMPLE_SPLIT,
  MIN_DATASET_SIZE,
  MAX_DATASET_SIZE,
  MIN_MIN_SAMPLE_SPLIT,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_LIMITS,
  DEFAULT_STEP
} from '../../constants';

// Manage Alert timeouts
let lastAlertTimeoutId: ReturnType<typeof setTimeout>;

interface DecisionTreeState {
  currentPanelPage: PANEL_PAGES;
  label: string;
  labels: string[];
  labelStorage: string[];
  error: string | null;
  datasetSize: number;
  dataset: DataPoint[];
  criterion: Criterion;
  maxDepth: number;
  minSampleSplit: number;
  splitter: Splitter;
  animationDuration: number;
  detailed: boolean;
  steps: Step[];
  step: number;
  play: boolean;
}

const initialState: DecisionTreeState = {
  currentPanelPage: PANEL_PAGES.PARAMS,
  label: LABEL_COLORS[INITIAL_LABEL_COUNT],
  labels: LABEL_COLORS.slice(0, INITIAL_LABEL_COUNT),
  labelStorage: LABEL_COLORS.slice(INITIAL_LABEL_COUNT),
  error: null,
  datasetSize: DEFAULT_DATASET_SIZE,
  dataset: [],
  criterion: Criterion.GINI,
  maxDepth: 0,
  minSampleSplit: DEFAULT_MIN_SAMPLE_SPLIT,
  splitter: Splitter.BEST,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  detailed: true,
  steps: [],
  step: 0,
  play: false,
};

const reducer = (state: DecisionTreeState, action: Actions): DecisionTreeState => {
  switch(action.type) {
    case ActionTypes.SET_DT_PANEL_PAGE:
      return { ...state, currentPanelPage: action.payload };
    case ActionTypes.SET_DT_LABEL_INPUT:
      return { ...state, label: action.payload };
    case ActionTypes.SET_DT_LABELS:
      return { ...state, labels: action.payload };
    case ActionTypes.SET_DT_LABEL_STORAGE:
      return { ...state, labelStorage: action.payload };
    case ActionTypes.SET_DT_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_DT_DATASET_SIZE:
      return { ...state, datasetSize: action.payload };
    case ActionTypes.SET_DT_DATASET:
      return { ...state, dataset: action.payload, steps: [], step: 0 };
    case ActionTypes.SET_CRITERION:
      return { ...state, criterion: action.payload };
    case ActionTypes.SET_MAX_DEPTH:
      return { ...state, maxDepth: action.payload };
    case ActionTypes.SET_MIN_SAMPLE_SPLIT:
      return { ...state, minSampleSplit: action.payload };
    case ActionTypes.SET_SPLITTER:
      return { ...state, splitter: action.payload };
    case ActionTypes.SET_DT_ANIMATION_DURATION:
      return { ...state, animationDuration: action.payload };
    case ActionTypes.SET_DT_ANIMATION_DETAILED:
      return { ...state, detailed: action.payload };
    case ActionTypes.SET_DT_STEPS:
      return { ...state, steps: action.payload, step: 0 };
    case ActionTypes.SET_DT_STEP:
      return { ...state, step: action.payload };
    case ActionTypes.SET_DT_PLAY:
      return { ...state, play: action.payload };
    case ActionTypes.SET_DT_PARAMETERS:
      return { ...state, ...action.payload };
    default: return state;
  }
};

const setDTCurrentPanelPage = (dispatch: Dispatch<Actions>) => ({ panelPage }: { panelPage: PANEL_PAGES }) => {
  dispatch({ type: ActionTypes.SET_DT_PANEL_PAGE, payload: panelPage });
};

const setDTLabel = (dispatch: Dispatch<Actions>) => ({ label }: { label: string }) => {
  dispatch({ type: ActionTypes.SET_DT_LABEL_INPUT, payload: label });
};

const addDTLabel = (dispatch: Dispatch<Actions>) => (
  { label, labelStorage, labels }: { label: string, labelStorage: string[], labels: string[] }) => {
  try {
    if (labels.length >= MAX_LABEL_COUNT) throw new Error("You've reached the maximum label count");
    
    // Check if label already in label list
    const labelMatch = labels.find(item => label === item);
    if (labelMatch) throw new Error('Cannot add twice the same label');

    // Check if label in labels list. Remove it if it is the case
    const filteredLabels = labelStorage.filter(item => label !== item);
    dispatch({ type: ActionTypes.SET_DT_LABEL_STORAGE, payload: filteredLabels });

    // Add new label
    dispatch({ type: ActionTypes.SET_DT_LABELS, payload: [...labels, label] });

    // Set new label input
    dispatch({ type: ActionTypes.SET_DT_LABEL_INPUT, payload: filteredLabels[0] });
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_DT_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_DT_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

const removeDTLabel = (dispatch: Dispatch<Actions>) => (
  { label, labelStorage, labels }: { label: string, labelStorage: string[], labels: string[] }) => {
  try {
    if (labels.length <= MIN_LABEL_COUNT)
      // @ts-ignore -- Keep in case MIN_LABEL_COUNT changes
      throw new Error(`There must be at least ${MIN_LABEL_COUNT} label${MIN_LABEL_COUNT !== 1 ? 's' : ''}`);

    // Check if label removed in storage
    const labelMatch = LABEL_COLORS.find(item => item === label);

    if (labelMatch) {
      // If the removed label is in the LABEL_COLORS array, add it back to the storage
      dispatch({ type: ActionTypes.SET_DT_LABEL_STORAGE, payload: [...labelStorage, label] });
    }

    // Remove label from labels list
    const filteredLabels = labels.filter(item => item !== label);
    dispatch({ type: ActionTypes.SET_DT_LABELS, payload: filteredLabels });
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_DT_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_DT_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

const setDTDatasetSize = (dispatch: Dispatch<Actions>) => ({ size }: { size: number }) => {
  dispatch({ type: ActionTypes.SET_DT_DATASET_SIZE, payload: size });
};

const resetDTDataset = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_DT_DATASET, payload: [] });
};

const setMaxDepth = (dispatch: Dispatch<Actions>) => ({ maxDepth }: { maxDepth: number }) => {
  dispatch({ type: ActionTypes.SET_MAX_DEPTH, payload: maxDepth });
};

const setMinSampleSplit = (dispatch: Dispatch<Actions>) => ({ minSampleSplit }: { minSampleSplit: number }) => {
  dispatch({ type: ActionTypes.SET_MIN_SAMPLE_SPLIT, payload: minSampleSplit });
};

const resetDTError = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_DT_ERROR, payload: null });
};

const setDTAnimationDuration = (dispatch: Dispatch<Actions>) => ({ animationDuration }: { animationDuration: number }) => {
  dispatch({ type: ActionTypes.SET_DT_ANIMATION_DURATION, payload: animationDuration });
};

const setDTDetailed = (dispatch: Dispatch<Actions>) => ({ detailed }: { detailed: boolean }) => {
  dispatch({ type: ActionTypes.SET_DT_ANIMATION_DETAILED, payload: detailed });
};

const setDTPlay = (dispatch: Dispatch<Actions>) => ({ play }: { play: boolean }) => {
  dispatch({ type: ActionTypes.SET_DT_PLAY, payload: play });
};

const generateDTRandomDataset = (dispatch: Dispatch<Actions>) => (
  { labels, size, maxDepth, minSampleSplit, splitter, criterion }
  : { labels: string[], size: number; maxDepth: number; minSampleSplit: number; splitter: Splitter; criterion: Criterion; }
) => {
  const data: DataPoint[] = [];

  // Generate a random point and add it to the array for each iteration of the size
  for (let i = 0; i < size; i++) {
    const x = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const y = randomNumberBetweenInterval(MIN_COORD, MAX_COORD);
    const index = randomNumberBetweenInterval(0, labels.length - 1);

    data.push({
      coords: { x, y },
      label: labels[index]
    });
  }

  const steps = decisionTree({
    data,
    baseSteps: [],
    steps: [DEFAULT_STEP],
    limits: DEFAULT_LIMITS,
    currentDepth: 1,
    maxDepth,
    minSampleSplit,
    splitter,
    criterion
  });

  dispatch({ type: ActionTypes.SET_DT_DATASET, payload: data });
  dispatch({ type: ActionTypes.SET_DT_STEPS, payload: steps || [] });
};

const onPlay = (dispatch: Dispatch<Actions>) => ({ play }: { play: boolean }) => {
  dispatch({ type: ActionTypes.SET_DT_PLAY, payload: !play });
};

const onStart = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_DT_STEP, payload: 0 });
};

const onPrevious = (dispatch: Dispatch<Actions>) => ({
  steps,
  step,
  detailed
}: {
  steps: Step[];
  step: number;
  detailed: boolean
}) => {
  if (step > 0) {
    // If the animation is detailed, we need to go through all the main steps and substeps
    if (detailed) {
      dispatch({ type: ActionTypes.SET_DT_STEP, payload: step - 1 });
    } else {
      // If the animation is not detailed, look for the previous main step and dispatch it
      let currentStep = step;
      while (currentStep > 0) {
        currentStep --;
        if (steps[currentStep].checkpoint) {
          dispatch({ type: ActionTypes.SET_DT_STEP, payload: currentStep });
          return;
        }
      }
    }
  }
};

const onStop = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_DT_STEP, payload: 0 });
};

const onNext = (dispatch: Dispatch<Actions>) => ({
  step,
  steps,
  detailed
}: {
  step: number;
  steps: Step[];
  detailed: boolean;
}) => {
  if (step < steps.length - 1) {
    // If the animation is detailed, we need to go through all the main steps and substeps
    if (detailed) {
      dispatch({ type: ActionTypes.SET_DT_STEP, payload: step + 1 });
    } else {
      // If the animation is not detailed, look for the next main step and dispatch it
      let currentStep = step;
      while (currentStep < steps.length - 1) {
        currentStep ++;
        if (steps[currentStep].checkpoint) {
          dispatch({ type: ActionTypes.SET_DT_STEP, payload: currentStep });
          return;
        }
      }
    }
  } else {
    dispatch({ type: ActionTypes.SET_DT_PLAY, payload: false });
  }
};

const onEnd = (dispatch: Dispatch<Actions>) => ({ steps }: { steps: Step[] }) => {
  if (steps.length > 0) {
    dispatch({ type: ActionTypes.SET_DT_STEP, payload: steps.length - 1 });
    dispatch({ type: ActionTypes.SET_DT_PLAY, payload: false });
  }
};

const handleInputChange = (dispatch: Dispatch<Actions>) => ({
  data,
  datasetSize,
  maxDepth,
  minSampleSplit,
  criterion,
  splitter,
  reinitiateAlgorithm = true
} : {
  data: DataPoint[];
  datasetSize: number;
  maxDepth: number;
  minSampleSplit: number;
  criterion: Criterion;
  splitter: Splitter;
  reinitiateAlgorithm?: boolean;
}) => {
  const MAX_SAMPLE_SPLIT = datasetSize;

  dispatch({
    type: ActionTypes.SET_DT_PARAMETERS,
    payload: {
      datasetSize: clamp(datasetSize, MIN_DATASET_SIZE, MAX_DATASET_SIZE),
      maxDepth,
      minSampleSplit: clamp(minSampleSplit, MIN_MIN_SAMPLE_SPLIT, MAX_SAMPLE_SPLIT),
      criterion,
      splitter,
      play: false
    }
  });

  if (reinitiateAlgorithm && data.length > 0) {
    const steps = decisionTree({
      data,
      baseSteps: [],
      steps: [DEFAULT_STEP],
      limits: DEFAULT_LIMITS,
      currentDepth: 1,
      maxDepth,
      minSampleSplit,
      splitter,
      criterion
    });

    dispatch({ type: ActionTypes.SET_DT_STEPS, payload: steps || [] });
  }
};

export const { Provider, Context } = createDataContext(
  initialState,
  {
    setDTCurrentPanelPage,
    setDTLabel,
    addDTLabel,
    removeDTLabel,
    setDTDatasetSize,
    generateDTRandomDataset,
    resetDTDataset,
    setMaxDepth,
    setMinSampleSplit,
    resetDTError,
    setDTAnimationDuration,
    setDTDetailed,
    setDTPlay,
    handleInputChange,
    onStart,
    onPrevious,
    onPlay,
    onStop,
    onNext,
    onEnd
  },
  reducer
);