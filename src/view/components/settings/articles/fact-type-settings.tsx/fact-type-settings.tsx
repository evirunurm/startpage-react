import React, { useEffect } from "react";
import { Article } from "@components/atoms/article/article";
import { RadioGroup } from "@components/atoms/radio-group/radio-group";
import { Radio } from "@components/atoms/radio/radio";
import { Label } from "@components/atoms/label/label";
import { getEnumArray, useLocalStorageState } from "@utils/utils";
import { FactType } from "@domain/fact/FactTypeEnum";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";

export const FactTypeSettings: React.FC = () => {
	const [storedFactType, setStoredFactType] = useLocalStorageState<FactType>(LocalStorageType.FactType);

	const handleFactTypeChange = (newValue: string) => {
		setStoredFactType(Number(newValue) as FactType);
	}

	useEffect(() => {
		if (storedFactType === null) {
			setStoredFactType(FactType.Cats);
		}
	}, [storedFactType]);

	return (
		<Article>
			<RadioGroup
				value={storedFactType?.toString()}
				onChange={handleFactTypeChange}
			>
				<Label>Fact type</Label>
				{
					getEnumArray(FactType).map((factType: any) => (
						<Radio
							key={factType.key}
							value={factType.value.toString()}
						>
							{factType.key}
						</Radio>
					))
				}
			</RadioGroup>
		</Article>
	);
}