import useGetFact from "@application/getFact";
import { Button } from "@components/atoms/button/button";
import { useStore } from "@service/store";
import styles from "./fact.module.css";

export const Fact: React.FC = () => {
    const { getFact, updateFact } = useGetFact();
    const { storedFact, updateStoredFact } = useStore();

    const handleButtonClick = async () => {
		await updateFact();
        const newFact = getFact();
        updateStoredFact(newFact);
    };

    return (
        <section classNames={styles['fact-container']}>
            <p>{storedFact}</p>
            <Button onPress={handleButtonClick}>
                Next Fact
            </Button>
        </section>
    );
};