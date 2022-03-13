import "./ErrorPage.scss";
import ErrorPageBackground from '../../assets/error-bg.png';

import { Link } from 'react-router-dom';

import { Background, Button } from '../../components';

import { ROUTES } from '../../types';

/**
 * Error Page - Default Page when user enters bad URL
 */

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Background src={ErrorPageBackground} />
      <div className="error-page__content">
        <div className="error-page__content__title">Page not found</div>
        <div className="error-page__content__subtitle">
          Looks like you've reached unknown territory.
        </div>
        <Link to={ROUTES.LANDING}>
          <Button title="Home" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;