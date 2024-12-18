import ICryptoResult from "@domain/crypto/ICryptoResult";
import { ICryptoService } from "./ports";
import { useCryptoService } from "@service/cryptoAdapter";
import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";

export default function useGetCrypto() {
	let price: number;
	let changePercent24H: number;
	const cryptoService: ICryptoService<ICryptoResult> = useCryptoService();

	function getPrice(): number {
		return price;
	}

	function getChangePercent(): number {
		return changePercent24H;
	}

	async function updateCryptoInfo(cryptocurrency: Cryptocurrency): Promise<void> {
		const { data }: ICryptoResult = await cryptoService.getData(cryptocurrency)
		price = parseFloat(data.priceUsd);
		changePercent24H = parseFloat(data.changePercent24Hr);
	}

	return {
		getPrice,
		getChangePercent,
		updateCryptoInfo
	};
}
