import useGetFact from "@application/getFact";
import { Button } from "@components/atoms/button/button";
import { useStore } from "@service/store";
import styles from "./fact.module.css";

export const Fact: React.FC = () => {
    const { getFact, updateFact } = useGetFact();
    const { storedFact, updateStoredFact, storedFactType} = useStore();

    const handleNextFactClick = async () => {
		await updateFact(storedFactType);
        const newFact = getFact();
        updateStoredFact(newFact);
    };

    return (
        <section className={styles['fact-container']}>
            <p className={styles["fact-container__fact"]}>{storedFact}</p>
            <Button onPress={handleNextFactClick}>
                Next Fact
            </Button>
        </section>
    );
};