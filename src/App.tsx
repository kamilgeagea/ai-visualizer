import './App.scss';

import { ContactProvider, DecisionTreeProvider, KNNProvider, KMeansProvider } from './state';

import Navigator from './navigation/Navigator';

const App = () => {
  return (
    <ContactProvider>
      <DecisionTreeProvider>
        <KNNProvider>
          <KMeansProvider>
            <Navigator />
          </KMeansProvider>
        </KNNProvider>
      </DecisionTreeProvider>
    </ContactProvider>
  );
};

export default App;
