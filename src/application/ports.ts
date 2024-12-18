import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";

export interface IFactsService<TFactResult> {
	getFact(): Promise<TFactResult>;
}

export interface ICryptoService<TCryptoResult> {
	getData(cryptocurrency: Cryptocurrency): Promise<TCryptoResult>;
}
