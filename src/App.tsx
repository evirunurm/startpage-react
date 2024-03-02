import React from 'react';
import DogFactsApi from './data/facts/DogFactsApi';
import CatFactsApi from './data/facts/CatFactsApi';
import JokeFactsApi from './data/facts/JokeFactsApi';
import FactHolder from './domain/entity/facts/models/FactHolder';
import FactsUseCase from './domain/interactors/facts/factsUseCase';
import FactViewModelImpl from './presentation/view-model/fact/factViewModelImpl';
import FactComponent from './presentation/view/components/facts/facts-component';

// const Startpage = React.lazy(() => import('./presentation/view/pages/Startpage'));

function App(): JSX.Element {
  // data layer
  const dogFactsApi = new DogFactsApi();
  const catFactsApi = new CatFactsApi();
  const jokeFactsApi = new JokeFactsApi();

  // domain layer
  const factHolder = new FactHolder();
  const factUseCase = new FactsUseCase(catFactsApi, dogFactsApi,jokeFactsApi, factHolder);

   // view layer
   const factViewModel = new FactViewModelImpl(factUseCase, factHolder);

  return (
    <div>
      <FactComponent factViewModel={factViewModel} />
    </div>
  )
}


export default App