import React, { useState } from "react";
import { Article } from "@components/atoms/article/article";
import { Disclosure } from "@components/atoms/disclosure/disclosure";
import { RadioGroup } from "@components/atoms/radio-group/radio-group";
import { Radio } from "@components/atoms/radio/radio";
import { getEnumArray } from "@utils/utils";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { useTranslation } from "react-i18next";
import { Cryptocurrency } from "@domain/crypto/Cryptocurrency";

export const CryptocurrencySettings: React.FC = () => {
	const { t } = useTranslation();
	const [storedCrypto, setStoredCrypto] = useLocalStorageState<Cryptocurrency | null>(LocalStorageType.Crypto);
	const [enabled, setEnabled] = useState<boolean>(!!storedCrypto);
	const [expanded, setExpanded] = useState<boolean>(false);

	const handleEnabledChange = (enabled: boolean) => {
		setEnabled(enabled);
		setExpanded(enabled);
		setStoredCrypto(enabled ? Cryptocurrency.Bitcoin : null);
	}

	const handleCryptoChange = (cryptocurrency: string) => {
		setStoredCrypto(cryptocurrency as Cryptocurrency);
	}

	return (
		<Disclosure
			title="Cryptocurrency"
			selected={enabled}
			onSelectedSwitch={handleEnabledChange}
			isExpanded={expanded}
			onExpandedChange={setExpanded}
		>
			<Article>
				<RadioGroup
					value={storedCrypto?.toString() || ""}
					aria-label="Cryptocurrency"
					onChange={handleCryptoChange}
				>
					{
						getEnumArray(Cryptocurrency)
							.map(({ key, value }) => (
								<Radio
									key={key}
									value={value.toString()}
								>
									{t(`${key}`)}
								</Radio>
							))
					}
				</RadioGroup>
			</Article>
		</Disclosure>
	);
}