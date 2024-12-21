import useGetFact from "@application/getFact";
import { Button } from "@components/atoms/button/button";
import styles from "./fact.module.css";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { FactType } from "@domain/fact/FactType";
import { useTranslation } from "react-i18next";

export const Fact: React.FC = () => {
	const { t } = useTranslation();
	const { getFact, updateFact } = useGetFact();
	const [storedFact, updateStoredFact] = useLocalStorageState<string>(LocalStorageType.Fact);
	const [storedFactType] = useLocalStorageState<FactType>(LocalStorageType.FactType);

	const handleNextFactClick = async () => {
		if (storedFactType !== null) {
			await updateFact(storedFactType);
			const newFact = getFact();
			updateStoredFact(newFact);
		}
	};

	if (storedFactType === null) {
		return null;
	}

	return (

		<section className={styles['fact-container']}>
			<p className={styles["fact-container__fact"]}>{storedFact}</p>
			<Button onPress={handleNextFactClick}>
				{t("common.next")}
			</Button>
		</section>
	);
};