import FactRepository from '../../domain/repository/facts/FactsRepository';
import ICatsFactResult from '../../domain/entity/facts/structures/ICatsFactResult';
// Class that imitates access to the Cat Facts API
export default class CatFactsApi implements FactRepository {
    apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_FACTS_CATS_URL || '';
    }

    /**
    * @throws {Error} if failed to fetch the fact
    */
    async fetch(): Promise<ICatsFactResult> {
        try {
            const res = await fetch(this.apiUrl, {
                mode: 'cors',
            });

            const factResult : ICatsFactResult = await res.json();
            return factResult;
        } catch (err) {
            throw new Error(String(err));
        }
    }
}