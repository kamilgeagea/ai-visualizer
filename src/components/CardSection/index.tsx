import './CardSection.scss';

import Card from '../Card';

import { Section } from '../../types';

type CardSectionProps = Section

/**
 * This component displays a title followed by an array of cards on the screen.
 * It is used separate the models into different sections (Supervised Learning, Unsupervised
 * learning, etc...)
 */

const CardSection = ({ title, cards }: CardSectionProps) => {
  return (
    <div className="card-section">
      <div className="card-section__title">{title}</div>
      <div className="card-section__cards">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`card-section__cards__card${index === 0 ? '__first' : ''}`}
          >
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;