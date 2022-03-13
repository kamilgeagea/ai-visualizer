/**
 * File containing all the types in the application
 */

// Props

export interface CardAttributes {
  preview: string;
  title: string;
  description: string;
  to: ROUTES;
}

export interface Section {
  title: string;
  cards: CardAttributes[];
}

// Navigation

export enum ROUTES {
  LANDING = "/",
  MODELS = "/models",
  CONTACT = "/contact",
  ABOUT = "/about",
  DECISION_TREE = "/decision-tree",
  K_NEAREST_NEIGHBORS = "/k-nearest-neighbors",
  KMEANS = "/kmeans",
  DEFAULT = "*",
}

// Visualizer

export enum PANEL_PAGES {
  PARAMS = "PARAMS",
  LOGS = "LOGS",
  INFO = "INFO",
}

export enum Feature {
  x = "x",
  y = "y",
}

export enum LogRank {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export type Coords = {
  [key in Feature]: number;
};

export interface DataPoint {
  coords: Coords;
  label: string;
}

export interface Log {
  rank: LogRank;
  log: string;
}

export enum GraphPointType {
  OUTLINE = "OUTLINE",
  LABEL = "LABEL",
  CENTROID = "CENTROID",
}

export interface GraphObjectBase {
  permanent: boolean;
}

export interface Line extends GraphObjectBase {
  start: Coords;
  end: Coords;
}

export interface GraphPoint extends GraphObjectBase {
  type: GraphPointType;
  coords: Coords;
  color?: string;
}

export type GraphObject = Line | GraphPoint;

export interface Step {
  checkpoint: boolean;
  logs: Log[];
  objects: GraphObject[];
}

export interface Video {
  title: string;
  link: string;
}

export interface Info {
  image: string;
  title: string;
  description: string;
  link: string;
  videos: Video[];
}

export interface DistanceParams {
  datasetPoint: DataPoint;
  point: DataPoint;
  steps: Step[];
  baseSteps: GraphObject[];
  baseLogs?: Log[];
}

export interface DistancePoint {
  point: DataPoint;
  distance: number;
}

// Decision Tree

export enum Criterion {
  GINI = "GINI",
  ENTROPY = "ENTROPY",
}

export enum Splitter {
  BEST = "BEST",
  RANDOM = "RANDOM",
}

export type Split =
  | {
      x: number;
      y?: never;
    }
  | {
      x?: never;
      y: number;
    };

export type CoordsLimits = {
  [key in Feature]: {
    min: number;
    max: number;
  };
};

// KNN

export enum Weights {
  UNIFORM = "UNIFORM",
  DISTANCE = "DISTANCE",
}

export enum Distance {
  EUCLIDEAN = "EUCLIDEAN",
  MANHATTAN = "MANHATTAN",
}

// KMeans

export type Centroids = { [key: string]: DataPoint };
