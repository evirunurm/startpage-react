import FactRepository from '../../domain/repository/facts/FactsRepository';
import IJokesFactResult from '../../domain/entity/facts/structures/IJokeFactResult';
// Class that imitates access to the Cat Facts API
export default class JokeFactsApi implements FactRepository {
    apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_FACTS_JOKES_URL || '';
    }

    /**
    * @throws {Error} if failed to fetch the fact
    */
    async fetch(): Promise<IJokesFactResult> {
        try {
            const res = await fetch(this.apiUrl, {
                mode: 'cors',
            });
            const factResult : IJokesFactResult = await res.json();
            return factResult;
        } catch (err) {
            throw new Error(String(err));
        }
    }
}