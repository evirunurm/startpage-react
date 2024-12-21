import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";
import ICryptoData from "@domain/crypto/ICryptoData";
import ICryptoResult from "@domain/crypto/ICryptoResult";
import { useQuery } from "react-query";

export async function fetchCryptoPrice(currency: Cryptocurrency): Promise<ICryptoResult> {
	let apiUrl = process.env.REACT_APP_CRYPTO_PRICE_URL || "";
	apiUrl = apiUrl.concat(currency);
	const response = await fetch(apiUrl, {
		mode: "cors",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as ICryptoResult;
}

export function useCryptoPrice(currency: Cryptocurrency) {
	const { data, isLoading, error } = useQuery<ICryptoResult, Error>(
		['cryptoPrice', currency],
		() => fetchCryptoPrice(currency),
		{
			staleTime: process.env.MAX_STALE_TIME ? parseInt(process.env.MAX_STALE_TIME) : 360000,
			cacheTime: process.env.MAX_CACHE_TIME ? parseInt(process.env.MAX_CACHE_TIME) : 360000,
		}
	);

	return {
		data: {
			changePercent24H: parseFloat(data?.data.changePercent24Hr ?? "0"),
			price: parseFloat(data?.data.priceUsd ?? "0"),
			explorer: data?.data.explorer,
		} as ICryptoData,
		isLoading,
		error
	};
}