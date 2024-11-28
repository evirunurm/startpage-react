import { useCatFactService } from "@service/catFactsAdapter";
import { FactType } from "@domain/fact/FactTypeEnum";
import ICatsFactResult from "@domain/fact/ICatsFactResult";
import { IFactsService } from "@application/ports";

export default function useGetFact() {
	// Usually, we access services through Dependency Injection.
	// Here we can use hooks as a crooked “DI-container”.

	let fact: string = String();
	const catFactService: IFactsService<ICatsFactResult> = useCatFactService();

	function getFact(): string {
		return fact;
	}

	async function updateFact(factType: FactType): Promise<void> {
		let newFact: string;
		switch (factType) {
			case FactType.Cats:
				newFact = await getCatFact();
				break;
			default:
				throw new Error("Unknown fact type");
		}
		fact = newFact;
	}

	async function getCatFact(): Promise<string> {
		const newFact = await catFactService.getFact();
		return newFact.fact;
	}

	return {
		getFact,
		updateFact
	};
}