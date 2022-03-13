import { Dispatch } from 'react';

import createDataContext from '../createDataContext';

import ActionTypes from '../action-types';
import { Actions } from '../actions';

import {
  addLabelToStorage,
  removeLabelFromStorage,
  clamp
} from '../../utilities';

import {
  PANEL_PAGES,
  DataPoint,
  Distance,
  Step
} from '../../types';
import {
  ALERT_TIMEOUT,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_DATASET_SIZE,
  INITIAL_LABEL_COUNT,
  LABEL_COLORS,
  MAX_DATASET_SIZE,
  RESERVED_COLORS
} from '../../constants';
import generateUnlabeledRandomDataset from '../../utilities/generateUnlabeledRandomDataset';
import kmeans from '../../algorithms/kmeans';

// Manage Alert timeouts
let lastAlertTimeoutId: ReturnType<typeof setTimeout>;

interface KMeansState {
  currentPanelPage: PANEL_PAGES;
  label: string;
  labels: string[];
  labelStorage: string[];
  error: string | null;
  datasetSize: number;
  dataset: DataPoint[];
  maxIterations: number;
  distance: Distance;
  animationDuration: number;
  detailed: boolean;
  steps: Step[];
  step: number;
  play: boolean;
}

const initialState: KMeansState = {
  currentPanelPage: PANEL_PAGES.PARAMS,
  label: LABEL_COLORS[INITIAL_LABEL_COUNT],
  labels: LABEL_COLORS.slice(0, INITIAL_LABEL_COUNT),
  labelStorage: LABEL_COLORS.slice(INITIAL_LABEL_COUNT),
  error: null,
  datasetSize: DEFAULT_DATASET_SIZE,
  dataset: [],
  maxIterations: 0,
  distance: Distance.EUCLIDEAN,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  detailed: true,
  steps: [],
  step: 0,
  play: false
};

const reducer = (state: KMeansState, action: Actions): KMeansState => {
  switch(action.type) {
    case ActionTypes.SET_KMEANS_PANEL_PAGE:
      return { ...state, currentPanelPage: action.payload };
    case ActionTypes.SET_KMEANS_LABEL:
      return { ...state, label: action.payload };
    case ActionTypes.SET_KMEANS_LABELS:
      return { ...state, labels: action.payload };
    case ActionTypes.SET_KMEANS_LABEL_STORAGE:
      return { ...state, labelStorage: action.payload };
    case ActionTypes.SET_KMEANS_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_KMEANS_DATASET_SIZE:
      return { ...state, datasetSize: action.payload };
    case ActionTypes.SET_KMEANS_DATASET:
      return { ...state, dataset: action.payload };
    case ActionTypes.SET_KMEANS_ANIMATION_DURATION:
      return { ...state, animationDuration: action.payload };
    case ActionTypes.SET_KMEANS_DETAILED:
      return { ...state, detailed: action.payload };
    case ActionTypes.SET_KMEANS_STEPS:
      return { ...state, steps: action.paylaod, step: 0 };
    case ActionTypes.SET_KMEANS_STEP:
      return { ...state, step: action.payload };
    case ActionTypes.SET_KMEANS_PLAY:
      return { ...state, play: action.payload };
    case ActionTypes.SET_KMEANS_PARAMETERS:
      return { ...state, ...action.payload };
    case ActionTypes.SET_KMEANS_MAX_ITERATIONS:
      return { ...state, maxIterations: action.payload };
    default: return state;
  }
};

const setCurrentPanelPage = (dispatch: Dispatch<Actions>) => ({ panelPage }: { panelPage: PANEL_PAGES }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_PANEL_PAGE, payload: panelPage });
};

const setLabel = (dispatch: Dispatch<Actions>) => ({ label }: { label: string }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_LABEL, payload: label });
};

const addLabel = (dispatch: Dispatch<Actions>) => (
  { label, labelStorage, labels, datasetSize }
  : { label: string; labelStorage: string[]; labels: string[]; datasetSize: number; }
) => {
  try {
    if (RESERVED_COLORS.includes(label.toUpperCase())) throw new Error("This color is reserved");

    // Removes the label from storage list and returns the new storage
    const filteredLabels = removeLabelFromStorage({ label, labels, labelStorage });

    // Update storage
    dispatch({ type: ActionTypes.SET_KMEANS_LABEL_STORAGE, payload: filteredLabels });

    // Add new label
    const updatedLabels = [...labels, label];
    dispatch({ type: ActionTypes.SET_KMEANS_LABELS, payload: updatedLabels });

    // Set new label input
    dispatch({ type: ActionTypes.SET_KMEANS_LABEL, payload: filteredLabels[0] });

    // Modify dataset size if number of clusters exceed dataset size
    if (updatedLabels.length > datasetSize) {
      dispatch({ type: ActionTypes.SET_KMEANS_DATASET_SIZE, payload: updatedLabels.length });
    }
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_KMEANS_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_KMEANS_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

const removeLabel = (dispatch: Dispatch<Actions>) => (
  { label, labelStorage, labels }
  : { label: string; labelStorage: string[]; labels: string[]; }
) => {
  try {
    // Return label if it is in default storage
    const labelMatch = addLabelToStorage({ label, labels, labelStorage });

    if (labelMatch) {
      // If label is returned, add it back to storage
      dispatch({ type: ActionTypes.SET_KMEANS_LABEL_STORAGE, payload: [...labelStorage, labelMatch] });
    }

    // Remove label from list
    const filteredLabels = labels.filter(item => item !== label);
    dispatch({ type: ActionTypes.SET_KMEANS_LABELS, payload: filteredLabels });
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_KMEANS_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_KMEANS_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

const setDatasetSize = (dispatch: Dispatch<Actions>) => ({ size }: { size: number; }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_DATASET_SIZE, payload: size });
};

const generateDataset = (dispatch: Dispatch<Actions>) => (
  {
    size,
    labels,
    clusters,
    maxIterations,
    distance
  }: {
    size: number;
    labels: string[];
    clusters: number;
    maxIterations: number;
    distance: Distance;
  }
) => {
  const dataset = generateUnlabeledRandomDataset({ size });
  dispatch({ type: ActionTypes.SET_KMEANS_DATASET, payload: dataset });

  // TODO: IMPLEMENT KMEANS HYPERPARAMETERS
  const steps = kmeans({ points: dataset, labels, steps: [], maxIterations, distance });
  dispatch({ type: ActionTypes.SET_KMEANS_STEPS, paylaod: steps });
};

const resetDataset = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KMEANS_DATASET, payload: [] });
};

const setAnimationDuration = (dispatch: Dispatch<Actions>) => ({ animationDuration }: { animationDuration: number; }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_ANIMATION_DURATION, payload: animationDuration });
};

const setDetailed = (dispatch: Dispatch<Actions>) => ({ detailed }: { detailed: boolean; }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_DETAILED, payload: detailed });
};

const onPlay = (dispatch: Dispatch<Actions>) => ({ play }: { play: boolean }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_PLAY, payload: !play });
};

const onStart = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: 0 });
};

const onPrevious = (dispatch: Dispatch<Actions>) => ({
  steps,
  step,
  detailed
}: {
  steps: Step[];
  step: number;
  detailed: boolean;
}) => {
  if (step > 0) {
    // If the animation is detailed, we need to go through all the main steps and substeps
    if (detailed) {
      dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: step - 1 });
    } else {
      // If the animation is not detailed, look for the previous main step and dispatch it
      let currentStep = step;
      while (currentStep > 0) {
        currentStep--;
        if (steps[currentStep].checkpoint) {
          dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: currentStep });
          return;
        }
      }
    }
  }
};

const onStop = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: 0 });
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
      dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: step + 1 });
    } else {
      // If the animation is not detailed, look for the next main step and dispatch it
      let currentStep = step;
      while (currentStep < steps.length - 1) {
        currentStep++;
        if (steps[currentStep].checkpoint) {
          dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: currentStep });
          return;
        }
      }
    }
  } else {
    dispatch({ type: ActionTypes.SET_KMEANS_PLAY, payload: false });
  }
};

const onEnd = (dispatch: Dispatch<Actions>) => ({ steps }: { steps: Step[]; }) => {
  if (steps.length > 0) {
    dispatch({ type: ActionTypes.SET_KMEANS_STEP, payload: steps.length - 1 });
    dispatch({ type: ActionTypes.SET_KMEANS_PLAY, payload: false });
  }
};

const setPlay = (dispatch: Dispatch<Actions>) => ({ play }: { play: boolean; }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_PLAY, payload: play });
};

const resetError = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KMEANS_ERROR, payload: null });
};

const setMaxIterations = (dispatch: Dispatch<Actions>) => ({ maxIterations }: { maxIterations: number; }) => {
  dispatch({ type: ActionTypes.SET_KMEANS_MAX_ITERATIONS, payload: maxIterations });
};

const handleInputChange = (dispatch: Dispatch<Actions>) => ({
  datasetSize,
  dataset,
  labels,
  maxIterations,
  distance,
  reinitiateAlgorithm = true
}: {
  datasetSize: number;
  dataset: DataPoint[];
  labels: string[];
  maxIterations: number;
  distance: Distance;
  reinitiateAlgorithm: boolean;
}) => {
  dispatch({
    type: ActionTypes.SET_KMEANS_PARAMETERS,
    payload: {
      datasetSize: clamp(datasetSize, labels.length, MAX_DATASET_SIZE),
      maxIteration: maxIterations,
      distance: distance
    }
  });

  if (reinitiateAlgorithm) {
    // TODO: ADD KMEANS ALGORITHM ONCE IMPLEMENTED
    const steps = kmeans({ points: dataset, labels, steps: [], maxIterations, distance });
    dispatch({ type: ActionTypes.SET_KMEANS_STEPS, paylaod: steps });
  }
};

export const { Context, Provider } = createDataContext(
  initialState,
  {
    setCurrentPanelPage,
    setLabel,
    addLabel,
    removeLabel,
    setDatasetSize,
    generateDataset,
    resetDataset,
    setAnimationDuration,
    setDetailed,
    onPlay,
    onStart,
    onPrevious,
    onStop,
    onNext,
    onEnd,
    setPlay,
    resetError,
    setMaxIterations,
    handleInputChange
  },
  reducer
);