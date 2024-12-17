import { useCatFactService } from "@service/catFactsAdapter";
import { FactType } from "@domain/fact/FactType";
import ICatsFactResult from "@domain/fact/ICatsFactResult";
import { IFactsService } from "@application/ports";
import IDogsFactResult from "@domain/fact/IDogsFactResult";
import { useDogFactService } from "@service/dogFactsAdapter";
import IJokesResult from "@domain/fact/IJokesResult";
import { useJokesService } from "@service/jokesAdapter";

export default function useGetFact() {
	// Usually, we access services through Dependency Injection.
	// Here we can use hooks as a crooked “DI-container”.

	let fact: string = String();
	const catFactService: IFactsService<ICatsFactResult> = useCatFactService();
	const dogFactService: IFactsService<IDogsFactResult> = useDogFactService();
	const jokesService: IFactsService<IJokesResult> = useJokesService();

	function getFact(): string {
		return fact;
	}

	async function updateFact(factType: FactType): Promise<void> {
		let newFact: string;
		switch (factType) {
			case FactType.Cats:
				newFact = await getCatFact();
				break;
			case FactType.Dogs:
				newFact = await getDogFact();
				break;
			case FactType.Jokes:
				newFact = await getJoke();
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

	async function getDogFact(): Promise<string> {
		const newFact = await dogFactService.getFact();
		return newFact.facts[0];
	}

	async function getJoke(): Promise<string> {
		const newFact = await jokesService.getFact();
		return `${newFact.setup} ${newFact.punchline}`;
	}

	return {
		getFact,
		updateFact,
	};
}
