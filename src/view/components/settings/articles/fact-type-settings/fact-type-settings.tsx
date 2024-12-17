import React, { useEffect } from "react";
import { Article } from "@components/atoms/article/article";
import { RadioGroup } from "@components/atoms/radio-group/radio-group";
import { Radio } from "@components/atoms/radio/radio";
import { getEnumArray, useLocalStorageState } from "@utils/utils";
import { FactType } from "@domain/fact/FactTypeEnum";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { Disclosure } from "@components/atoms/disclosure/disclosure";

export const FactTypeSettings: React.FC = () => {
	const [storedFactType, setStoredFactType] = useLocalStorageState<FactType>(LocalStorageType.FactType);

	const handleFactTypeChange = (newValue: string) => {
		setStoredFactType(Number(newValue) as FactType);
	}

	useEffect(() => {
		if (storedFactType === null) {
			setStoredFactType(FactType.Cats);
		}
	}, [storedFactType, setStoredFactType]);

	return (
		<Disclosure title="Fact type">
			<Article>
				<RadioGroup
					value={storedFactType?.toString()}
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