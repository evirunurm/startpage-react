import FactRepository from '../../repository/facts/FactsRepository';
import FactHolder from '../../entity/facts/models/FactHolder';
import CatsFactResult from '../../entity/facts/structures/CatsFactResult';
import FactResult from '../../entity/facts/structures/FactResult';
import DogsFactResult from '../../entity/facts/structures/DogsFactResult';
import JokesFactResult from '../../entity/facts/structures/JokeFactResult';
import { FactType } from '../../entity/facts/structures/FactTypeEnum';

export default class FactsUseCase {
  private catsFactsRepository: FactRepository;
  private dogsFactsRepository: FactRepository;
  private jokesFactsRepository: FactRepository;
  private factHolder: FactHolder;

  public constructor(catsFactsRepository: FactRepository,
    dogsFactsRepository: FactRepository,
    jokesFactsRepository: FactRepository, 
    factHolder: FactHolder) {
    this.catsFactsRepository = catsFactsRepository;
    this.dogsFactsRepository = dogsFactsRepository;
    this.jokesFactsRepository = jokesFactsRepository;
    this.factHolder = factHolder;
  }

  /**
   *  Execute the fact retrieval based on the passed type
   */
  public async fetchFactResult(factType: FactType): Promise<void> {
    switch (factType) {
      case FactType.Cats:
        await this.fetchCatsFactResult();
        break;
      case FactType.Dogs:
        await this.fetchDogsFactResult();
        break;
      case FactType.Jokes:
        await this.fetcJokesFactResult();
        break;
      default:
    }
  }

  /**
   * @throws {Error} if token is not valid or the limit of petitions has been reached
   */
  private async fetchCatsFactResult(): Promise<void> {
    const result : FactResult = await this.catsFactsRepository.fetch();
    const catsResult : CatsFactResult = result as CatsFactResult;
    this.factHolder.onFactFetched(catsResult.fact, FactType.Cats);
  }

  /**
   * @throws {Error} if token is not valid or the limit of petitions has been reached
   */
  private async fetchDogsFactResult(): Promise<void> {
    const result : FactResult = await this.dogsFactsRepository.fetch();
    const dogsResult : DogsFactResult = result as DogsFactResult;
    this.factHolder.onFactFetched(dogsResult.facts[0],  FactType.Dogs);
  }

  /**
   * @throws {Error} if token is not valid or the limit of petitions has been reached
   */
  private async fetcJokesFactResult(): Promise<void> {
    const result : FactResult = await this.jokesFactsRepository.fetch();
    const jokesResult : JokesFactResult = result as JokesFactResult;
    const fact = jokesResult.setup + ': ' + jokesResult.punchline;
    this.factHolder.onFactFetched(fact,  FactType.Jokes);
  }
}