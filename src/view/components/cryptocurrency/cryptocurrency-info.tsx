
import useGetCrypto from "@application/getCrypto";
import styles from "./cryptocurrency-info.module.css";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";
import { useEffect, useState } from "react";

export const CryptocurrencyInfo: React.FC = () => {
	const [price, setPrice] = useState<number>();
	const [percent, setPercent] = useState<number>();
	const { getPrice, getChangePercent, updateCryptoInfo } = useGetCrypto();
	const [storedCrypto] = useLocalStorageState<Cryptocurrency | null>(LocalStorageType.Crypto);

	const fetchCryptoData = async () => {
		await updateCryptoInfo(Cryptocurrency.Bitcoin);
		setPrice(roundTwoDecimals(getPrice()));
		setPercent(roundTwoDecimals(getChangePercent()));
	}

	const roundTwoDecimals = (value: number) => {
		return Math.round(value * 100) / 100;
	}

	useEffect(() => {
		fetchCryptoData();
	}, [storedCrypto, updateCryptoInfo]);

	return (
		<section className={styles["cryptocurrency-info"]}>
			<p>{price} USD</p>
			<p>{percent}%</p>
		</section>
	);
};
