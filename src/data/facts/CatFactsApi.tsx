import FactRepository from '../../domain/repository/facts/FactsRepository';
import CatsFactResult from '../../domain/entity/facts/structures/CatsFactResult';
// Class that imitates access to the Cat Facts API
export default class CatFactsApi implements FactRepository {
    apiUrl: string;

    constructor() {
        this.apiUrl = process.env.REACT_APP_FACTS_CATS_URL || '';
    }

    /**
    * @throws {Error} if failed to fetch the fact
    */
    async fetch(): Promise<CatsFactResult> {
        console.log(this.apiUrl)
        try {
            const res = await fetch(this.apiUrl, {
                mode: 'cors',
            });

            const factResult : CatsFactResult = await res.json();
            console.log(factResult)
            return factResult;
        } catch (err) {
            console.log('CatFactsApi.fetch()',err)
            throw new Error(String(err));
        }
    }
}