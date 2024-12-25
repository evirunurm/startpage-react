import { useCatFactService } from "@service/cat-facts.service";
import { FactType } from "@domain/fact/FactType";
import ICatsFactResult from "@domain/fact/ICatsFactResult";
import { IFactsService } from "@application/ports";
import IDogsFactResult from "@domain/fact/IDogsFactResult";
import { useDogFactService } from "@service/dog-facts.service";
import IJokesResult from "@domain/fact/IJokesResult";
import { useJokesService } from "@service/joke-facts.service";

export default function useGetFact() {
	let fact: string = '';
	const catFactService: IFactsService<ICatsFactResult> = useCatFactService();
	const dogFactService: IFactsService<IDogsFactResult> = useDogFactService();
	const jokesService: IFactsService<IJokesResult> = useJokesService();

	function getFact(): string {
		return fact;
	}

	async function updateFact(factType: FactType | null): Promise<void> {
		if (factType === null) return;

		const factFetchers = {
			[FactType.Cats]: getCatFact,
			[FactType.Dogs]: getDogFact,
			[FactType.Jokes]: getJoke
		};

		const fetchFact = factFetchers[factType];
		if (!fetchFact) throw new Error("Unknown fact type");

		fact = await fetchFact();
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
