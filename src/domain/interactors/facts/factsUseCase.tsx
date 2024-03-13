import FactRepository from '../../repository/facts/FactsRepository';
import FactHolder from '../../entity/facts/models/FactHolder';
import ICatsFactResult from '../../entity/facts/structures/ICatsFactResult';
import IFactResult from '../../entity/facts/structures/IFactResult';
import IDogsFactResult from '../../entity/facts/structures/IDogsFactResult';
import IJokesFactResult from '../../entity/facts/structures/IJokeFactResult';
import { FactType } from '../../entity/facts/FactTypeEnum';

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
    const result : IFactResult = await this.catsFactsRepository.fetch();
    const catsResult : ICatsFactResult = result as ICatsFactResult;
    this.factHolder.onFactFetched(catsResult.fact, FactType.Cats);
  }

  /**
   * @throws {Error} if token is not valid or the limit of petitions has been reached
   */
  private async fetchDogsFactResult(): Promise<void> {
    const result : IFactResult = await this.dogsFactsRepository.fetch();
    const dogsResult : IDogsFactResult = result as IDogsFactResult;
    this.factHolder.onFactFetched(dogsResult.facts[0],  FactType.Dogs);
  }

  /**
   * @throws {Error} if token is not valid or the limit of petitions has been reached
   */
  private async fetcJokesFactResult(): Promise<void> {
    const result : IFactResult = await this.jokesFactsRepository.fetch();
    const jokesResult : IJokesFactResult = result as IJokesFactResult;
    const fact = jokesResult.setup + ': ' + jokesResult.punchline;
    this.factHolder.onFactFetched(fact,  FactType.Jokes);
  }
}