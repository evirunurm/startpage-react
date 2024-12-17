import IFactResult from "@domain/fact/IFactResult";

export default interface IJokesResult extends IFactResult {
	type: string;
	setup: string;
	punchline: string;
	id: number;
}
