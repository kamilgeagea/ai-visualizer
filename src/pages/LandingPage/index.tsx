import "./LandingPage.scss";
import LandingPageBackground from '../../assets/landing-bg.png';

import { Link } from 'react-router-dom';

import { Background, Button } from '../../components';

import { ROUTES } from '../../types';

/**
 * Landing Page
 */

const LandingPage = () => {
  return (
    <div className="landing">
      <Background src={LandingPageBackground} />
      <div className="landing__content">
        <div className="landing__content__title">AI Visualizer</div>
        <div className="landing__content__subtitle">
          A new way to view Artificial Intelligence
        </div>
        <div className="landing__content__description">
          The goal of the AI Visualizer project is to simplify the way Artificial Intelligence
          is taught by using the "Learning by Example" approach.
        </div>
        <Link to={ROUTES.MODELS}>
          <Button title="Get Started" />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;