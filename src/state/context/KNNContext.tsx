import { Dispatch } from 'react';

import createDataContext from '../createDataContext';

import ActionTypes from '../action-types';
import { Actions } from '../actions';

import { addLabelToStorage, removeLabelFromStorage, generateRandomDataset, clamp } from '../../utilities';

import knn from '../../algorithms/kNearestNeighbors';

import {
  PANEL_PAGES,
  DataPoint,
  Weights,
  Distance,
  Step
} from '../../types';
import {
  ALERT_TIMEOUT,
  UNLABELED_COLOR,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_DATASET_SIZE,
  DEFAULT_K,
  DEFAULT_X,
  DEFAULT_Y,
  INITIAL_LABEL_COUNT,
  LABEL_COLORS,
  MAX_DATASET_SIZE,
  MIN_DATASET_SIZE,
  MIN_K,
  RESERVED_COLORS
} from '../../constants';

// Manage Alert timeouts
let lastAlertTimeoutId: ReturnType<typeof setTimeout>;

interface KNNState {
  currentPanelPage: PANEL_PAGES;
  label: string;
  labels: string[];
  labelStorage: string[];
  error: string | null;
  datasetSize: number;
  dataset: DataPoint[];
  x: number;
  y: number;
  points: DataPoint[];
  k: number;
  weights: Weights;
  distance: Distance;
  animationDuration: number;
  detailed: boolean;
  steps: Step[];
  step: number;
  play: boolean;
}

const initialState: KNNState = {
  currentPanelPage: PANEL_PAGES.PARAMS,
  label: LABEL_COLORS[INITIAL_LABEL_COUNT],
  labels: LABEL_COLORS.slice(0, INITIAL_LABEL_COUNT),
  labelStorage: LABEL_COLORS.slice(INITIAL_LABEL_COUNT),
  error: null,
  datasetSize: DEFAULT_DATASET_SIZE,
  dataset: [],
  x: DEFAULT_X,
  y: DEFAULT_Y,
  points: [],
  k: DEFAULT_K,
  weights: Weights.UNIFORM,
  distance: Distance.EUCLIDEAN,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  detailed: true,
  steps: [],
  step: 0,
  play: false
};

const reducer = (state: KNNState, action: Actions): KNNState => {
  switch(action.type) {
    case ActionTypes.SET_KNN_PANEL_PAGE:
      return { ...state, currentPanelPage: action.payload };
    case ActionTypes.SET_KNN_LABEL:
      return { ...state, label: action.payload };
    case ActionTypes.SET_KNN_LABELS:
      return { ...state, labels: action.payload };
    case ActionTypes.SET_KNN_LABEL_STORAGE:
      return { ...state, labelStorage: action.payload };
    case ActionTypes.SET_KNN_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_KNN_DATASET_SIZE:
      return { ...state, datasetSize: action.payload };
    case ActionTypes.SET_KNN_DATASET:
      return { ...state, dataset: action.payload, steps: [], step: 0 };
    case ActionTypes.SET_KNN_X:
      return { ...state, x: action.payload };
    case ActionTypes.SET_KNN_Y:
      return { ...state, y: action.payload };
    case ActionTypes.SET_KNN_POINTS:
      return { ...state, points: action.payload, steps: [], step: 0 };
    case ActionTypes.SET_K:
      return { ...state, k: action.payload };
    case ActionTypes.SET_KNN_ANIMATION_DURATION:
      return { ...state, animationDuration: action.payload };
    case ActionTypes.SET_KNN_DETAILED:
      return { ...state, detailed: action.payload };
    case ActionTypes.SET_KNN_STEPS:
      return { ...state, steps: action.payload, step: 0 };
    case ActionTypes.SET_KNN_STEP:
      return { ...state, step: action.payload };
    case ActionTypes.SET_KNN_PLAY:
      return { ...state, play: action.payload };
    case ActionTypes.SET_KNN_PARAMETERS:
      return { ...state, ...action.payload };
    default: return state;
  }
};

const setCurrentPanelPage = (dispatch: Dispatch<Actions>) => ({ panelPage }: { panelPage: PANEL_PAGES }) => {
  dispatch({ type: ActionTypes.SET_KNN_PANEL_PAGE, payload: panelPage });
};

const setLabel = (dispatch: Dispatch<Actions>) => ({ label }: { label: string }) => {
  dispatch({ type: ActionTypes.SET_KNN_LABEL, payload: label });
};

const addLabel = (dispatch: Dispatch<Actions>) => (
  { label, labelStorage, labels }
  : { label: string; labelStorage: string[]; labels: string[]; }
) => {
  try {
    if (RESERVED_COLORS.includes(label.toUpperCase())) throw new Error("This color is reserved.");

    // Removes the label from storage list and returns the new storage
    const filteredLabels = removeLabelFromStorage({ label, labels, labelStorage });

    // Update storage
    dispatch({ type: ActionTypes.SET_KNN_LABEL_STORAGE, payload: filteredLabels });

    // Add new label
    dispatch({ type: ActionTypes.SET_KNN_LABELS, payload: [...labels, label] });

    // Set new label input
    dispatch({ type: ActionTypes.SET_KNN_LABEL, payload: filteredLabels[0] });
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: null }), ALERT_TIMEOUT);
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
      dispatch({ type: ActionTypes.SET_KNN_LABEL_STORAGE, payload: [...labelStorage, labelMatch] });
    }

    // Remove label from list
    const filteredLabels = labels.filter(item => item !== label);
    dispatch({ type: ActionTypes.SET_KNN_LABELS, payload: filteredLabels });
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

const setDatasetSize = (dispatch: Dispatch<Actions>) => ({ size }: { size: number }) => {
  dispatch({ type: ActionTypes.SET_KNN_DATASET_SIZE, payload: size });
};

const generateDataset = (dispatch: Dispatch<Actions>) => (
  {
    size,
    labels,
    points,
    k,
    distance,
    weights
  }: {
    size: number;
    labels: string[];
    points: DataPoint[];
    k: number;
    distance: Distance;
    weights: Weights;
  }) => {
  const dataset = generateRandomDataset({ size, labels });
  dispatch({ type: ActionTypes.SET_KNN_DATASET, payload: dataset });

  if (points.length) {
    const steps = knn({ points, dataset, k, steps: [], distance, weights });
    dispatch({ type: ActionTypes.SET_KNN_STEPS, payload: steps });
  }
};

const resetDataset = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KNN_DATASET, payload: [] });
};

const setX = (dispatch: Dispatch<Actions>) => ({ x }: { x: number }) => {
  dispatch({ type: ActionTypes.SET_KNN_X, payload: x });
};

const setY = (dispatch: Dispatch<Actions>) => ({ y }: { y: number }) => {
  dispatch({ type: ActionTypes.SET_KNN_Y, payload: y });
};

const addPoint = (dispatch: Dispatch<Actions>) => ({
  x,
  y,
  points,
  dataset,
  k,
  weights,
  distance
}: {
  x: number;
  y: number;
  points: DataPoint[];
  dataset: DataPoint[];
  k: number;
  weights: Weights;
  distance: Distance;
}) => {
  try {
    // If points with these coordinates already exist, throw error
    if (points.find(({ coords }) => coords.x === x && coords.y === y))
      throw new Error(`There already is a point with coordinates x = ${x} and y = ${y}`);
    
    // Create point
    const point: DataPoint = {
      coords: { x, y },
      label: UNLABELED_COLOR
    };

    const newPoints = [...points, point]
    
    dispatch({ type: ActionTypes.SET_KNN_POINTS, payload: newPoints });

    if (dataset.length > 0) {
      const steps = knn({ points: newPoints, dataset, k, steps: [], distance, weights });
      dispatch({ type: ActionTypes.SET_KNN_STEPS, payload: steps });
    }
  } catch (e: any) {
    dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: e.message });
    lastAlertTimeoutId && clearTimeout(lastAlertTimeoutId);
    lastAlertTimeoutId = setTimeout(() => dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: null }), ALERT_TIMEOUT);
  }
};

const removePoint = (dispatch: Dispatch<Actions>) => ({
  x,
  y,
  points,
  dataset,
  k,
  weights,
  distance
}: {
  x: number;
  y: number;
  points: DataPoint[];
  dataset: DataPoint[];
  k: number;
  weights: Weights;
  distance: Distance;
}) => {
  const filteredPoints = points.filter(({ coords }) => coords.x !== x || coords.y !== y);

  dispatch({ type: ActionTypes.SET_KNN_POINTS, payload: filteredPoints });

  if (dataset.length > 0 && filteredPoints.length > 0) {
    const steps = knn({ points: filteredPoints, dataset, k, steps: [], distance, weights });
    dispatch({ type: ActionTypes.SET_KNN_STEPS, payload: steps });
  }
};

const resetPoints = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KNN_POINTS, payload: [] });
};

const setK = (dispatch: Dispatch<Actions>) => ({ k }: { k: number }) => {
  dispatch({ type: ActionTypes.SET_K, payload: k });
};

const setAnimationDuration = (dispatch: Dispatch<Actions>) => ({ animationDuration }: { animationDuration: number }) => {
  dispatch({ type: ActionTypes.SET_KNN_ANIMATION_DURATION, payload: animationDuration });
};

const setDetailed = (dispatch: Dispatch<Actions>) => ({ detailed }: { detailed: boolean }) => {
  dispatch({ type: ActionTypes.SET_KNN_DETAILED, payload: detailed });
};

const onPlay = (dispatch: Dispatch<Actions>) => ({ play }: { play: boolean }) => {
  dispatch({ type: ActionTypes.SET_KNN_PLAY, payload: !play });
};

const onStart = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KNN_STEP, payload: 0 });
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
      dispatch({ type: ActionTypes.SET_KNN_STEP, payload: step - 1 });
    } else {
      // If the animation is not detailed, look for the previous main step and dispatch it
      let currentStep = step;
      while (currentStep > 0) {
        currentStep --;
        if (steps[currentStep].checkpoint) {
          dispatch({ type: ActionTypes.SET_KNN_STEP, payload: currentStep });
          return;
        }
      }
    }
  }
};

const onStop = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KNN_STEP, payload: 0 });
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
      dispatch({ type: ActionTypes.SET_KNN_STEP, payload: step + 1 });
    } else {
      // If the animation is not detailed, look for the next main step and dispatch it
      let currentStep = step;
      while (currentStep < steps.length - 1) {
        currentStep ++;
        if (steps[currentStep].checkpoint) {
          dispatch({ type: ActionTypes.SET_KNN_STEP, payload: currentStep });
          return;
        }
      }
    }
  } else {
    dispatch({ type: ActionTypes.SET_KNN_PLAY, payload: false });
  }
};

const onEnd = (dispatch: Dispatch<Actions>) => ({ steps }: { steps: Step[] }) => {
  if (steps.length > 0) {
    dispatch({ type: ActionTypes.SET_KNN_STEP, payload: steps.length - 1 });
    dispatch({ type: ActionTypes.SET_KNN_PLAY, payload: false });
  }
};

const setPlay = (dispatch: Dispatch<Actions>) => ({ play }: { play: boolean }) => {
  dispatch({ type: ActionTypes.SET_KNN_PLAY, payload: play });
};

const resetError = (dispatch: Dispatch<Actions>) => () => {
  dispatch({ type: ActionTypes.SET_KNN_ERROR, payload: null });
};

const handleInputChange = (dispatch: Dispatch<Actions>) => ({
  datasetSize,
  dataset,
  points,
  k,
  weights,
  distance,
  reinitiateAlgorithm = true
}: {
  datasetSize: number;
  dataset: DataPoint[];
  points: DataPoint[];
  k: number;
  weights: Weights;
  distance: Distance;
  reinitiateAlgorithm?: boolean;
}) => {
  const MAX_K = datasetSize;

  dispatch({
    type: ActionTypes.SET_KNN_PARAMETERS,
    payload: {
      datasetSize: clamp(datasetSize, MIN_DATASET_SIZE, MAX_DATASET_SIZE),
      k: clamp(k, MIN_K, MAX_K),
      weights,
      distance
    }
  });

  if (reinitiateAlgorithm && dataset.length > 0 && points.length > 0) {
    const steps = knn({ points, dataset, k, steps: [], distance, weights });

    dispatch({ type: ActionTypes.SET_KNN_STEPS, payload: steps });
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
    setX,
    setY,
    addPoint,
    removePoint,
    resetPoints,
    setK,
    setAnimationDuration,
    setDetailed,
    onPlay,
    onStart,
    onPrevious,
    onNext,
    onEnd,
    onStop,
    setPlay,
    resetError,
    handleInputChange,
  },
  reducer
);