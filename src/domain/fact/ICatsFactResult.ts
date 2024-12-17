import IFactResult from "@domain/fact/IFactResult";

export default interface ICatsFactResult extends IFactResult {
	fact: string;
	length: number;
}
