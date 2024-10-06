import ICatsFactResult from "../domain/facts/catFact";
import { IFactsService } from "../application/ports";
import { catFactsAPI } from "./api";

export function useCatFact(): IFactsService<ICatsFactResult> {
  return {
    getFact() {
      return catFactsAPI();
    },
  };
}