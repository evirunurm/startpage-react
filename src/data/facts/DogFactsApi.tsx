import FactRepository from '../../domain/repository/facts/FactsRepository';
import DogsFactResult from '../../domain/entity/facts/structures/DogsFactResult';
// Class that imitates access to the Dog Facts API
export default class DogFactsApi implements FactRepository {
    apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_FACTS_DOGS_URL || '';
    }

    /**
    * @throws {Error} if failed to fetch the fact
    */
    async fetch(): Promise<DogsFactResult> {
        console.log(this.apiUrl)
        try {
            const res = await fetch(this.apiUrl, {
                mode: 'cors',
            });

            const factResult : DogsFactResult = await res.json();
            console.log(factResult)
            return factResult;
        } catch (err) {
            console.log('DogFactsApi.fetch()',err)
            throw new Error(String(err));
        }
    }
}