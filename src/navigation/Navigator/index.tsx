import './Navigator.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';

import {
  LandingPage,
  ModelsPage,
  ContactPage,
  AboutPage,
  ErrorPage,
  DecisionTreePage,
  KNNPage,
  KMeansPage
} from '../../pages';
import { Header } from '../../components';

import { ROUTES } from '../../types';

/**
 * Navigator Component - Renders the different pages of the app according to the URL
 */

const Navigator = () => {
  return (
    <HashRouter>
      <Header />
      <div className="routes">
        <Routes>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.MODELS} element={<ModelsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.DECISION_TREE} element={<DecisionTreePage />} />
          <Route path={ROUTES.K_NEAREST_NEIGHBORS} element={<KNNPage />} />
          <Route path={ROUTES.KMEANS} element={<KMeansPage />} />
          <Route path={ROUTES.DEFAULT} element={<ErrorPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default Navigator;