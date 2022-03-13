import './DatasetSection.scss';

import { ReactNode, FC, useState } from 'react';
import { SketchPicker } from 'react-color';

import {
  Section,
  Label,
  FlatButton,
  ClickOutSideDetector,
  InputField,
  Center
} from '../../../index';

import { MAX_LABEL_COUNT } from '../../../../constants';

interface DatasetSectionProps {
  label: string;
  labels: string[];
  labelStorage: string[];
  datasetSize: number;
  onLabelChange: ({ label }: { label: string; }) => void;
  setDatasetSize: ({ size }: { size: number }) => void;
  onAddLabel: Function;
  onRemoveLabel: (
    { label, labelStorage, labels }: { label: string, labelStorage: string[], labels: string[] }
  ) => void;
  resetDataset: () => void;
  generateRandomDataset: Function;
  handleInputChange: Function;
  children?: ReactNode;
}

const DatasetSection: FC<DatasetSectionProps> = ({
  label,
  labels,
  labelStorage,
  datasetSize,
  setDatasetSize,
  onLabelChange,
  onAddLabel,
  onRemoveLabel,
  generateRandomDataset,
  resetDataset,
  handleInputChange,
  children
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <Section label="Dataset">
      <Section label="Labels" subSection>
        <div className="dataset-section__labels__input-form">
          <div className="dataset-section__labels__input-form__label">
            <Label name="Color" />
          </div>
          <div className="dataset-section__labels__input-form__field">
            <FlatButton onClick={() => setShowColorPicker(!showColorPicker)}>
              <ColorAvatar color={label} />
            </FlatButton>
            {showColorPicker && (
              <ClickOutSideDetector onClick={() => setShowColorPicker(false)}>
                <div className='dataset-section__labels__input-form__color-picker'>
                  <SketchPicker
                    color={label}
                    onChange={color => onLabelChange({ label: color.hex })}
                  />
                </div>
              </ClickOutSideDetector>
            )}
          </div>
          <div className="dataset-section__labels__input-form__button">
            <FlatButton
              onClick={() => onAddLabel()}
              disabled={labels.length >= MAX_LABEL_COUNT}
            >
              Add
            </FlatButton>
          </div>
        </div>
        <div className="dataset-section__labels__content">
          <Label name="Labels" />
          <div className="dataset-section__labels__content__labels">
              {labels.map(item => (
                <div key={item} className="dataset-section__labels__content__labels__item">
                  <FlatButton onClick={() => onRemoveLabel({
                    label: item,
                    labels,
                    labelStorage
                  })}>
                    <ColorAvatar key={item} color={item} />
                  </FlatButton>
                </div>
              ))}
            </div>
        </div>
      </Section>
      <Section label="Random Data Points" subSection>
        <div className="dataset-section__random-data-points">
          <div className="dataset-section__random-data-points__form">
            <div className="dataset-section__random-data-points__form__input">
              <InputField
                label="Size"
                value={datasetSize}
                onChange={(newSize) => setDatasetSize({ size: newSize })}
                onBlur={handleInputChange}
              />
            </div>
            <Center>
              <FlatButton
                onClick={() => generateRandomDataset()}
              >
                Generate
              </FlatButton>
            </Center>
          </div>
          <Center>
            <FlatButton onClick={resetDataset}>Reset</FlatButton>
          </Center>
        </div>
      </Section>
      {children}
    </Section>
  );
};

interface ColorAvatarProps {
  color: string;
}

const ColorAvatar: FC<ColorAvatarProps> = ({ color }) => {
  return <div className="color-avatar" style={{ backgroundColor: color }} />
};

export default DatasetSection;