import { FC, useContext } from "react";

import { KMeansContext } from "../../state";

import {
  Visualizer,
  DatasetSection,
  AnimationSection,
  Section,
  Row,
  InputField,
  Dropdown,
  Disabled,
} from "../../components";

import { Distance, Info } from "../../types";

import KMeansInfoImage from "../../assets/kmeans-info-image.png";

const KMeansPage: FC = () => {
  const info: Info = {
    image: KMeansInfoImage,
    title: "KMeans",
    description: `k-means clustering is a method of vector quantization, originally from signal processing, that aims to partition n
    observations into k clusters in which each observation belongs to the cluster with the nearest mean (cluster centers or cluster
      centroid), serving as a prototype of the cluster. This results in a partitioning of the data space into Voronoi cells. k-means
      clustering minimizes within-cluster variances (squared Euclidean distances), but not regular Euclidean distances, which would be
      the more difficult Weber problem: the mean optimizes squared errors, whereas only the geometric median minimizes Euclidean
      distances. For instance, better Euclidean solutions can be found using k-medians and k-medoids.`,
    videos: [
      {
        title: "StatQuest: K-means clustering",
        link: "https://www.youtube.com/embed/4b5d3muPQmA",
      },
      {
        title: "K-means & Image Segmentation - Computerphile",
        link: "https://www.youtube.com/embed/yR7k19YBqiw",
      },
      {
        title: "Lecture 13.2 — Clustering | KMeans Algorithm",
        link: "https://www.youtube.com/embed/hDmNF9JG3lo",
      },
    ],
    link: "https://en.wikipedia.org/wiki/K-means_clustering",
  };

  const {
    state: {
      currentPanelPage,
      dataset,
      error,
      steps,
      step,
      play,
      animationDuration,
      detailed,
      label,
      labels,
      labelStorage,
      datasetSize,
      maxIterations,
      distance
    },
    setCurrentPanelPage,
    resetError,
    onPlay,
    onPrevious,
    onStop,
    onNext,
    onEnd,
    onStart,
    setPlay,
    setDatasetSize,
    setLabel,
    addLabel,
    removeLabel,
    generateDataset,
    resetDataset,
    setMaxIterations,
    handleInputChange,
    setAnimationDuration,
    setDetailed
  } = useContext(KMeansContext);

  return (
    <Visualizer
      title="K Means"
      currentPanelPage={currentPanelPage}
      setCurrentPanelPage={setCurrentPanelPage}
      dataset={dataset}
      error={error}
      onErrorDismiss={resetError}
      onPlay={() => onPlay({ play })}
      onPrevious={() => onPrevious({ step, steps, detailed })}
      onNext={() => onNext({ step, steps, detailed })}
      onStart={() => onStart()}
      onEnd={() => onEnd({ steps })}
      onStop={() => onStop()}
      steps={steps}
      step={step}
      play={play}
      animationDuration={animationDuration}
      onUnmount={() => setPlay({ play: false })}
      info={info}
    >
      <DatasetSection
        label={label}
        labels={labels}
        labelStorage={labelStorage}
        datasetSize={datasetSize}
        setDatasetSize={setDatasetSize}
        onLabelChange={setLabel}
        onAddLabel={() => addLabel({ label, labelStorage, labels, datasetSize })}
        onRemoveLabel={removeLabel}
        generateRandomDataset={() => generateDataset({
          size: datasetSize,
          labels,
          clusters: labels.length,
          distance,
          maxIterations
        })}
        resetDataset={resetDataset}
        handleInputChange={() => handleInputChange({
          datasetSize,
          dataset,
          labels,
          distance,
          maxIterations,
          reinitiateAlgorithm: false
        })}
      />
      <Section label="Hyperparameters">
        <Row>
          <Disabled disabled>
            <InputField
              label="K"
              value={labels.length}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </Disabled>
          <Dropdown
            label="Dist"
            value={distance}
            options={Object.keys(Distance)}
            onChange={distance => handleInputChange({
              datasetSize,
              dataset,
              labels,
              distance: distance as Distance,
              maxIterations,
              reinitiateAlgorithm: true
            })}
          />
        </Row>
        <Row>
          <InputField
            label="Max Iter"
            value={maxIterations}
            onChange={maxIterations => setMaxIterations({ maxIterations })}
            onBlur={() => handleInputChange({
              datasetSize,
              dataset,
              labels,
              distance,
              maxIterations,
              reinitiateAlgorithm: true
            })}
            onEmpty="None"
          />
        </Row>
      </Section>
      <AnimationSection
        animationDuration={animationDuration}
        detailed={detailed}
        onAnimationDurationChange={animationDuration => setAnimationDuration({ animationDuration })}
        onDetailedChange={detailed => setDetailed({ detailed })}
      />
    </Visualizer>
  );
};

export default KMeansPage;
