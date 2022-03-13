import "./ModelsPage.scss";
import ModelsPageBackground from '../../assets/models-bg.png';
import DecisionTreePreview from '../../assets/decision-tree-preview.png';
import KNNPreview from '../../assets/knn-preview.png';
import KmeansPreview from '../../assets/kmeans-preview.png';

import { Background, CardSection } from '../../components';

import { Section, ROUTES } from '../../types';

const sections: Section[] = [
  {
    title: 'Supervised Learning',
    cards: [
      {
        preview: DecisionTreePreview,
        title: 'Decision Tree',
        description: `A decision tree is a flowchart-like structure in which each internal
        node represents a "test" on an attribute.`,
        to: ROUTES.DECISION_TREE
      },
      {
        preview: KNNPreview,
        title: 'K Nearest Neighbors',
        description: `K-nearest-neighbor is a  data classifier that estimates how likely
        a data point is to be a member of a group.`,
        to: ROUTES.K_NEAREST_NEIGHBORS
      }
    ]
  },
  {
    title: 'Unsupervised Learning',
    cards: [
      {
        preview: KmeansPreview,
        title: 'Kmeans',
        description: `K-means is a vector quantization method that categorizes n points
        into k clusters based on the nearest mean.`,
        to: ROUTES.KMEANS
      }
    ]
  }
];

/**
 * Models Page
 */

const ModelsPage = () => {
  return (
    <div className="models">
      <Background src={ModelsPageBackground} />
      <div className="models__content">
        {sections.map(section => (
          <CardSection key={section.title} {...section} />
        ))}
      </div>
    </div>
  );
};

export default ModelsPage;