import ICatsFactResult from "@domain/fact/catFact";
import { IFactsService } from "@application/ports";
import { catFactsAPI } from "./api";

export function useCatFactService(): IFactsService<ICatsFactResult> {
  return {
    getFact() {
      return catFactsAPI();
    },
  };
}