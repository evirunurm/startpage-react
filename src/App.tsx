import DogFactsApi from '@data/facts/DogFactsApi';
import CatFactsApi from '@data/facts/CatFactsApi';
import JokeFactsApi from '@data/facts/JokeFactsApi';
import LocalStorageRepository from '@data/localStorage/BookmarksRepository';

import FactHolder from '@entity/facts/models/FactHolder';
import BookmarksHolder from '@entity/bookmarks/models/BookmarksHolder';

import FactViewModel from '@viewModels/facts/FactViewModel';
import BookmarksViewModel from '@viewModels/bookmarks/BookmarksViewModel';

import BookmarksUseCase from '@interactors/bookmarks/bookmarksUseCase';
import FactsUseCase from '@interactors/facts/factsUseCase';

import FactComponent from '@components/fact/fact-component';
import BookmarksContainer from '@components/bookmarks-container/bookmarks-container';
import FactSettingsComponent from '@components/facts-settings/facts-settings-component';

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

  return (
    <div>
      <FactSettingsComponent factViewModel={factViewModel} />
      <FactComponent factViewModel={factViewModel} ></FactComponent>
      <BookmarksContainer bookmarksViewModel={bookmarksViewModel}></BookmarksContainer>
    </div>
  )
}


export default App