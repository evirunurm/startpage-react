import useGetFact from "@application/getFact";
import { Button } from "@components/atoms/button/button";
import { useStore } from "@service/store";

export const Fact: React.FC = () => {
	// Get access to the use case in the component:
    const { getFact, updateFact } = useGetFact();
    const { storedFact, updateStoredFact } = useStore();

    const handleButtonClick = async () => {
		await updateFact();
        const newFact = getFact();
        updateStoredFact(newFact);
    };

    return (
        <>
            <p>{storedFact}</p>
            <Button onPress={handleButtonClick}>
                Next Fact
            </Button>
        </>
    );
};