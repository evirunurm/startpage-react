import useGetFact from "@application/getFact";
import { Button } from "@components/atoms/button/button";
import styles from "./fact.module.css";
import { useLocalStorageState } from "@utils/utils";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { FactType } from "@domain/fact/FactTypeEnum";

export const Fact: React.FC = () => {
	const { getFact, updateFact } = useGetFact();
	const [storedFact, updateStoredFact] = useLocalStorageState<string>(LocalStorageType.Fact);
	const [storedFactType] = useLocalStorageState<FactType>(LocalStorageType.FactType);

	const handleNextFactClick = async () => {
		await updateFact(storedFactType ?? FactType.Cats);
		const newFact = getFact();
		updateStoredFact(newFact);
	};

	if (storedFactType === FactType.None) {
		return null;
	}

	return (
		<section className={styles['fact-container']}>
			<p className={styles["fact-container__fact"]}>{storedFact}</p>
			<Button onPress={handleNextFactClick}>
				Next Fact
			</Button>
		</section>
	);
};