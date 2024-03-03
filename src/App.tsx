import DogFactsApi from './data/facts/DogFactsApi';
import CatFactsApi from './data/facts/CatFactsApi';
import JokeFactsApi from './data/facts/JokeFactsApi';
import FactHolder from './domain/entity/facts/models/FactHolder';
import FactsUseCase from './domain/interactors/facts/factsUseCase';
import FactSettingsViewModelImpl from './presentation/view-model/facts-settings/factSettingsViewModelImpl';
import FactSettingsComponent from './presentation/view/components/facts-settings/facts-settings-component';
import FactComponent from './presentation/view/components/fact/fact-component';

function App(): JSX.Element {
  // data layer
  const dogFactsApi = new DogFactsApi();
  const catFactsApi = new CatFactsApi();
  const jokeFactsApi = new JokeFactsApi();

  // domain layer
  const factHolder = new FactHolder();
  const factUseCase = new FactsUseCase(catFactsApi, dogFactsApi,jokeFactsApi, factHolder);

   // view layer
   const factViewModel = new FactSettingsViewModelImpl(factUseCase, factHolder);

  return (
    <div>
      <FactSettingsComponent factViewModel={factViewModel} />
      <FactComponent factViewModel={factViewModel} ></FactComponent>
    </div>
  )
}


export default App