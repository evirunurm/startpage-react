import FactResult from '../../entity/facts/structures/FactResult';
// Here we define an interface that will be implemented to access the APIs
export default interface FactRepository {
  apiUrl: string;

  /**
   * @throws {Error} if fetch failed
   */
  fetch(): Promise<FactResult>;
}