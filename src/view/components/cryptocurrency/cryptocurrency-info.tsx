
import { useCryptoPrice } from "@service/crypto.service";
import styles from "./cryptocurrency-info.module.css";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "@components/atoms/tag/tag";

export const CryptocurrencyInfo: React.FC = () => {
	const { t } = useTranslation();
	const [storedCryptocurrency] = useLocalStorageState<Cryptocurrency>(LocalStorageType.Crypto);
	const { data, isLoading, error } = useCryptoPrice(storedCryptocurrency as Cryptocurrency);

	const roundToTwoDecimals = (num: number): number => Math.round(num * 100) / 100;

	const price = useMemo((): string => {
		const price = roundToTwoDecimals(data.price);
		const formattedPrice = price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		return `${formattedPrice} USD`;
	}, [data.price]);

	const percent = useMemo((): string => {
		const percent = roundToTwoDecimals(data.changePercent24H);
		return percent > 0 ? `+ ${percent}%` : `${percent}%`;
	}, [data.changePercent24H]);

	if (!storedCryptocurrency) return null;

	return (
		storedCryptocurrency && !isLoading && !error && data &&
		(
			<section className={styles["cryptocurrency-info"]} >
				<Tag
					href={data.explorer}
					target="_blank"
					tooltip={percent}
				>
					<p>{t(`crypto.${storedCryptocurrency}`)} {price}</p>
				</Tag>
			</section >
		)
	);
};
