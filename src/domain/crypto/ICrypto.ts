import { Cryptocurrency } from "./Cryptocurrency";
import ICryptoData from "./ICryptoData";

export default interface ICrypto {
	cryptocurrency: Cryptocurrency,
	data: ICryptoData | undefined,
	timestamp: number | undefined,
}
