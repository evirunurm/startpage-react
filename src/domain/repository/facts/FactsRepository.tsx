import FactResult from '../../entity/facts/structures/FactResult';

// eHere we define an interface that will b implemented to access the APIs
export default interface FactRepository {
  apiUrl: string;

  /**
   * @throws {Error} if fetch failed
   */
  fetch(): Promise<FactResult>;
}