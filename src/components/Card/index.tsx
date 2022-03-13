import './Card.scss';

import { Link } from 'react-router-dom';

import { CardAttributes } from '../../types';

type CardProps = CardAttributes;

/**
 * Card that displays an image sample, the name, and the description of a certain model.
 * It leads to the model page.
 */

const Card = ({ preview, title, description, to }: CardProps) => {
  return (
    <Link to={to} className="card">
      <img src={preview} alt="Preview" />
      <div className="card__content">
        <div className="card__content__title">{title}</div>
        <div className="card__content__description">{description}</div>
      </div>
    </Link>
  );
};

export default Card;