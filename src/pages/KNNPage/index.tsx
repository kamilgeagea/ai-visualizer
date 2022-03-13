import { FC, useContext } from 'react';

import { KNNContext } from '../../state';

import {
  Visualizer,
  DatasetSection,
  AnimationSection,
  Section,
  Row,
  InputField,
  FlatButton,
  Dropdown
} from '../../components';

import { Info, Weights, Distance } from '../../types';

import KNNInfoImage from '../../assets/knn-info-image.jpeg';

const KNNPage: FC = () => {
  const info: Info = {
    image: KNNInfoImage,
    title: "K Nearest Neighbors",
    description: `In statistics, the k-nearest neighbors algorithm (k-NN) is a non-parametric classification method
    first developed by Evelyn Fix and Joseph Hodges in 1951, and later expanded by Thomas Cover. It is used for
    classification and regression. In both cases, the input consists of the k closest training examples in a data set.
    The output depends on whether k-NN is used for classification or regression:
    In k-NN classification, the output is a class membership. An object is classified by a plurality vote of its
    neighbors, with the object being assigned to the class most common among its k nearest neighbors (k is a positive
      integer, typically small). If k = 1, then the object is simply assigned to the class of that single nearest
      neighbor.
    In k-NN regression, the output is the property value for the object. This value is the average of the values of
    k nearest neighbors.`,
    videos: [
      { title: 'StatQuest: K-nearest neighbors, Clearly Explained', link: 'https://www.youtube.com/embed/HVXime0nQeI' },
      { title: 'How kNN algorithm works', link: 'https://www.youtube.com/embed/UqYde-LULfs' }
    ],
    link: 'https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm'
  };

  const {
    state: {
      currentPanelPage,
      dataset,
      error,
      step,
      steps,
      play,
      animationDuration,
      detailed,
      label,
      labels,
      labelStorage,
      datasetSize,
      x,
      y,
      k,
      weights,
      distance,
      points
    },
    setDatasetSize,
    resetDataset,
    setCurrentPanelPage,
    resetError,
    onStart,
    onPrevious,
    onPlay,
    onStop,
    onNext,
    onEnd,
    setPlay,
    generateDataset,
    setLabel,
    addLabel,
    removeLabel,
    setAnimationDuration,
    setDetailed,
    setX,
    setY,
    handleInputChange,
    setK,
    addPoint,
    removePoint,
    resetPoints
  } = useContext(KNNContext);

  return (
    <Visualizer
      title="K Nearest Neighbors"
      currentPanelPage={currentPanelPage}
      setCurrentPanelPage={setCurrentPanelPage}
      dataset={[...dataset, ...points]}
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
      onPointClick={({ x, y }) => {
        const point = points.find(({ coords }) => coords.x === x && coords.y === y );
        if (point) {
          removePoint({ x, y, points, dataset, k, weights, distance });
        }
      }}
    >
      <DatasetSection
        label={label}
        labels={labels}
        labelStorage={labelStorage}
        datasetSize={datasetSize}
        setDatasetSize={setDatasetSize}
        onLabelChange={setLabel}
        onAddLabel={() => addLabel({ label, labelStorage, labels })}
        onRemoveLabel={removeLabel}
        generateRandomDataset={() => generateDataset({ size: datasetSize, labels, points, k, distance, weights })}
        resetDataset={resetDataset}
        handleInputChange={() => handleInputChange({
          datasetSize,
          dataset,
          points,
          k,
          weights,
          distance,
          reinitiateAlgorithm: false
        })}
      >
        <Section label="Data Point" subSection>
          <Row>
            <InputField
              label="x"
              value={x}
              onChange={x => setX({ x })}
              onEmpty="0"
            />
            <FlatButton
              onClick={() => addPoint({
                points,
                x,
                y,
                dataset,
                k,
                weights,
                distance
              })}
            >Add</FlatButton>
          </Row>
          <Row>
            <InputField
              label="y"
              value={y}
              onChange={y => setY({ y })}
              onEmpty="0"
            />
            <FlatButton
              onClick={resetPoints}
            >Reset</FlatButton>
          </Row>
        </Section>
      </DatasetSection>
      <Section label="Hyperparameters">
        <Row>
          <InputField
            label="K"
            value={k}
            onChange={k => setK({ k })}
            onBlur={() => handleInputChange({
              datasetSize,
              dataset,
              points,
              k,
              weights,
              distance
            })}
          />
          <Dropdown
            label="Weights"
            options={Object.keys(Weights)}
            value={weights}
            onChange={weights => handleInputChange({
              datasetSize,
              dataset,
              points,
              k,
              weights: weights as Weights,
              distance
            })}
          />
        </Row>
        <Row>
          <Dropdown
            label="Dist"
            options={Object.keys(Distance)}
            value={distance}
            onChange={distance => handleInputChange({
              datasetSize,
              dataset,
              points,
              k,
              weights,
              distance: distance as Distance
            })}
          />
        </Row>
      </Section>
      <AnimationSection
        animationDuration={animationDuration}
        detailed={detailed}
        onAnimationDurationChange={value => setAnimationDuration({ animationDuration: value })}
        onDetailedChange={value => setDetailed({ detailed: value })}
      />
    </Visualizer>
  );
};

export default KNNPage;