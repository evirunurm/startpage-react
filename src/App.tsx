import DogFactsApi from './data/facts/DogFactsApi';
import CatFactsApi from './data/facts/CatFactsApi';
import JokeFactsApi from './data/facts/JokeFactsApi';
import FactHolder from './domain/entity/facts/models/FactHolder';
import FactsUseCase from './domain/interactors/facts/factsUseCase';
import FactViewModel from './presentation/view-model/facts/FactViewModel';
import BookmarksViewModel from './presentation/view-model/bookmarks/BookmarksViewModel';
import BookmarksUseCase from './domain/interactors/bookmarks/bookmarksUseCase';
import BookmarksHolder from './domain/entity/bookmarks/models/BookmarksHolder';
import LocalStorageRepository from './data/localStorage/BookmarksRepository';

import FactComponent from './presentation/view/components/fact/fact-component';
import BookmarksContainer from './presentation/view/components/bookmarks/bookmarks-container/bookmarks-container';
import FactSettingsComponent from './presentation/view/components/facts-settings/facts-settings-component';

function App(): JSX.Element {
  // data layer
  const dogFactsApi = new DogFactsApi();
  const catFactsApi = new CatFactsApi();
  const jokeFactsApi = new JokeFactsApi();
  const localStorage = new LocalStorageRepository();

  // domain layer
  const factHolder = new FactHolder();
  const factUseCase = new FactsUseCase(catFactsApi, dogFactsApi,jokeFactsApi, factHolder);

  const bookmarksHolder = new BookmarksHolder();
  const bookmarksUseCase = new BookmarksUseCase(localStorage, bookmarksHolder);

   // view layer
   const factViewModel = new FactViewModel(factUseCase, factHolder);
   const bookmarksViewModel = new BookmarksViewModel(bookmarksUseCase, bookmarksHolder);

   console.log(bookmarksViewModel)

  return (
    <div>
      <FactSettingsComponent factViewModel={factViewModel} />
      <FactComponent factViewModel={factViewModel} ></FactComponent>
      <BookmarksContainer bookmarksViewModel={bookmarksViewModel}></BookmarksContainer>
    </div>
  )
}


export default App