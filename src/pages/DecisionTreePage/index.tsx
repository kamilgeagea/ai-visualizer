import { FC, useContext } from 'react';

import { DecisionTreeContext } from '../../state';

import {
  Visualizer,
  Section,
  Row,
  Dropdown,
  InputField,
  AnimationSection,
  DatasetSection
} from '../../components';

import { Criterion, Info, Splitter } from '../../types';

import DecisionTreeInfoImage from '../../assets/decision-tree-info-image.jpeg';

const DecisionTreePage: FC = () => {
  const info: Info = {
    image: DecisionTreeInfoImage,
    title: "Decision Tree",
    description: `A decision tree is a decision support tool that uses a tree-like model of decisions and their possible
    consequences, including chance event outcomes, resource costs, and utility. It is one way to display an algorithm that
    only contains conditional control statements. Decision trees are commonly used in operations research, specifically in
    decision analysis, to help identify a strategy most likely to reach a goal, but are also a popular tool in machine
    learning.`,
    videos: [
      { title: 'StatQuest: Decision Trees', link: 'https://www.youtube.com/embed/7VeUPuFGJHk' },
      { title: 'Let’s Write a Decision Tree Classifier from Scratch', link: 'https://www.youtube.com/embed/LDRbO9a6XPU' },
      { title: 'Decision and Classification Trees, Clearly Explained!!!', link: 'https://www.youtube.com/embed/_L39rN6gz7Y' }
    ],
    link: 'https://en.wikipedia.org/wiki/Decision_tree'
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
      maxDepth,
      minSampleSplit,
      criterion,
      splitter
    },
    setDTCurrentPanelPage,
    resetDTError,
    onStart,
    onPrevious,
    onPlay,
    onStop,
    onNext,
    onEnd,
    setDTPlay,
    setDTLabel,
    addDTLabel,
    removeDTLabel,
    setDTDatasetSize,
    generateDTRandomDataset,
    resetDTDataset,
    setDTAnimationDuration,
    setDTDetailed,
    handleInputChange,
    setMaxDepth,
    setMinSampleSplit
  } = useContext(DecisionTreeContext);

  return (
    <Visualizer
      title="Decision Tree"
      currentPanelPage={currentPanelPage}
      setCurrentPanelPage={setDTCurrentPanelPage}
      dataset={dataset}
      error={error}
      onErrorDismiss={resetDTError}
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
      onUnmount={() => setDTPlay({ play: false })}
      info={info}
    >
      <DatasetSection
        label={label}
        labels={labels}
        labelStorage={labelStorage}
        datasetSize={datasetSize}
        onLabelChange={setDTLabel}
        setDatasetSize={setDTDatasetSize}
        onAddLabel={() => addDTLabel({ label, labelStorage, labels })}
        onRemoveLabel={removeDTLabel}
        generateRandomDataset={() => generateDTRandomDataset({
          labels,
          size: datasetSize,
          maxDepth,
          minSampleSplit,
          splitter,
          criterion
        })}
        resetDataset={resetDTDataset}
        handleInputChange={() => handleInputChange({
          data: dataset,
          datasetSize,
          maxDepth,
          minSampleSplit,
          criterion,
          splitter,
          reinitiateAlgorithm: false
        })}
      />
      <Section label="Hyperparameters">
        <Row>
          <Dropdown
            label="Criteria"
            value={criterion}
            options={Object.keys(Criterion)}
            onChange={value => handleInputChange({
              data: dataset,
              datasetSize,
              maxDepth,
              minSampleSplit,
              criterion: value as Criterion,
              splitter
            })}
          />
          <Dropdown
            label="Splitter"
            value={splitter}
            options={Object.keys(Splitter)}
            onChange={value => handleInputChange({
              data: dataset,
              datasetSize,
              maxDepth,
              minSampleSplit,
              criterion,
              splitter: value as Splitter
            })}
          />
        </Row>
        <Row>
          <InputField
            label="Depth"
            value={maxDepth}
            onEmpty="None"
            onChange={value => setMaxDepth({ maxDepth: value })}
            onBlur={() => handleInputChange({
              data: dataset,
              datasetSize,
              maxDepth,
              minSampleSplit,
              criterion,
              splitter
            })}
          />
          <InputField
            label="Min Split"
            value={minSampleSplit}
            onChange={value => setMinSampleSplit({ minSampleSplit: value })}
            onBlur={() => handleInputChange({
              data: dataset,
              datasetSize,
              maxDepth,
              minSampleSplit,
              criterion,
              splitter
            })}
          />
        </Row>
      </Section>
      <AnimationSection
        animationDuration={animationDuration}
        detailed={detailed}
        onAnimationDurationChange={value => setDTAnimationDuration({ animationDuration: value })}
        onDetailedChange={value => setDTDetailed({ detailed: value })}
      />
    </Visualizer>
  );
};

export default DecisionTreePage;

