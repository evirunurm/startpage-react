import React, { useState } from "react";
import { Article } from "@components/atoms/article/article";
import { RadioGroup } from "@components/atoms/radio-group/radio-group";
import { Radio } from "@components/atoms/radio/radio";
import { getEnumArray } from "@utils/utils";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { FactType } from "@domain/fact/FactType";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { Disclosure } from "@components/atoms/disclosure/disclosure";
import { useTranslation } from "react-i18next";

export const FactTypeSettings: React.FC = () => {
	const { t } = useTranslation();
	const [storedFactType, setStoredFactType] = useLocalStorageState<FactType | null>(LocalStorageType.FactType);
	const [enabled, setEnabled] = useState<boolean>(storedFactType !== null);

	const handleEnabledChange = (enabled: boolean) => {
		setEnabled(enabled);
		setStoredFactType(enabled ? FactType.Cats : null);
	}

	const handleFactTypeChange = (newValue: string) => {
		setStoredFactType(Number(newValue) as FactType);
	}

	return (
		<Disclosure
			selected={enabled}
			onSelectedSwitch={handleEnabledChange}
			title={t("facts.fact")}
		>
			<Article>
				<RadioGroup
					value={storedFactType?.toString() || ""}
					onChange={handleFactTypeChange}
					aria-label={t("facts.fact")}
				>
					{
						getEnumArray(FactType).map(({ key, value }) => (
							<Radio
								key={key}
								value={value.toString()}
							>
								{t(`facts.${key.toLowerCase()}`)}
							</Radio>
						))
					}
				</RadioGroup>
			</Article>
		</Disclosure>
	);
}