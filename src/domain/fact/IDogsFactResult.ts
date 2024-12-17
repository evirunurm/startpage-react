import IFactResult from "@domain/fact/IFactResult";

export default interface IDogsFactResult extends IFactResult {
	facts: string[];
	success: boolean;
}
