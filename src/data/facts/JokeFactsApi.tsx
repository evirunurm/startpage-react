import FactRepository from '../../domain/repository/facts/FactsRepository';
import JokesFactResult from '../../domain/entity/facts/structures/JokeFactResult';
// Class that imitates access to the Cat Facts API
export default class JokeFactsApi implements FactRepository {
    apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_FACTS_JOKES_URL || '';
    }

    /**
    * @throws {Error} if failed to fetch the fact
    */
    async fetch(): Promise<JokesFactResult> {
        console.log('API_LINK', this.apiUrl)
        try {
            const res = await fetch(this.apiUrl, {
                mode: 'cors',
            });
            const factResult : JokesFactResult = await res.json();
            return factResult;
        } catch (err) {
            throw new Error(String(err));
        }
    }
}