import { IFactsService } from "@application/ports";
import { dogFactsAPI } from "./api";
import IDogsFactResult from "@domain/fact/IDogsFactResult";

export function useDogFactService(): IFactsService<IDogsFactResult> {
	return {
		getFact() {
			return dogFactsAPI();
		},
	};
}
