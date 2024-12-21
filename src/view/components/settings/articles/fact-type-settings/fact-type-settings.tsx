import React, { useState } from "react";
import { Article } from "@components/atoms/article/article";
import { RadioGroup } from "@components/atoms/radio-group/radio-group";
import { Radio } from "@components/atoms/radio/radio";
import { getEnumArray } from "@utils/utils";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { FactType } from "@domain/fact/FactType";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { Disclosure } from "@components/atoms/disclosure/disclosure";

export const FactTypeSettings: React.FC = () => {
	const [storedFactType, setStoredFactType] = useLocalStorageState<FactType | null>(LocalStorageType.FactType);
	const [enabled, setEnabled] = useState<boolean>(storedFactType !== null);
	const [expanded, setExpanded] = useState<boolean>(false);

	const handleEnabledChange = (enabled: boolean) => {
		setEnabled(enabled);

		if (!enabled) {
			setExpanded(enabled);
			setStoredFactType(null);
		}
	}

	const handleFactTypeChange = (newValue: string) => {
		setStoredFactType(Number(newValue) as FactType);
	}

	return (
		<Disclosure
			selected={enabled}
			onSelectedSwitch={handleEnabledChange}
			isExpanded={expanded}
			onExpandedChange={setExpanded}
			title="Fact type"
		>
			<Article>
				<RadioGroup
					value={storedFactType?.toString() || ""}
					onChange={handleFactTypeChange}
					aria-label="Fact Type"
				>
					{
						getEnumArray(FactType).map(({ key, value }) => (
							<Radio
								key={key}
								value={value.toString()}
							>
								{key}
							</Radio>
						))
					}
				</RadioGroup>
			</Article>
		</Disclosure>
	);
}