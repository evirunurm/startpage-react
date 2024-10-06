import { useCatFact } from "../service/catFactsAdapter";

// Note that the port interfaces are in the _application layer_,
// but their implementation is in the _adapter_ layer.
import { IFactsService } from "./ports";
import { FactType } from "../domain/facts/FactTypeEnum";
import ICatsFactResult from "../domain/facts/catFact";

export function useGetFact() {
	// Usually, we access services through Dependency Injection.
	// Here we can use hooks as a crooked “DI-container”.

	// The use case function doesn't call third-party services directly,
	// instead, it relies on the interfaces we declared earlier.
	let factType: FactType = FactType.Cats; // Will change to a previously stored value
	let fact: string = String();
	const catFactService: IFactsService<ICatsFactResult> = useCatFact();

	function getFact(): string {
		return fact;
	}

	function setFactType(newFactType: FactType): void {
		factType = newFactType;
	}

	async function updateFact(): Promise<void> {
	let newFact: string;
	switch (factType) {
		case FactType.Cats:
			newFact = await getCatFact();
			break;
		default:
			throw new Error("Unknown fact type");
	}
	console.log(newFact)
	fact = newFact;
	}

  async function getCatFact(): Promise<string> {
    const newFact = await catFactService.getFact();
    return newFact.fact;
  }

  return {
    getFact,
    updateFact,
    setFactType
  };
}