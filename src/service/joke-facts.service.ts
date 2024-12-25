import { IFactsService } from "@application/ports";
import { jokesAPI } from "./api";
import IJokesResult from "@domain/fact/IJokesResult";

export function useJokesService(): IFactsService<IJokesResult> {
	return {
		getFact() {
			return jokesAPI();
		},
	};
}
