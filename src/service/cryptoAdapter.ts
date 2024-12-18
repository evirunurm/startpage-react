
import { ICryptoService } from "@application/ports";
import { coincapAPI } from "./api";
import ICryptoResult from "@domain/crypto/ICryptoResult";
import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";

export function useCryptoService(): ICryptoService<ICryptoResult> {
	return {
		getData(cryptocurrency: Cryptocurrency): Promise<ICryptoResult> {
			return coincapAPI(cryptocurrency);
		},
	};
}