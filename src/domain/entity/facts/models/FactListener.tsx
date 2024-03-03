// This class is used to update listeners
// in the FactHolder class
export default interface FactListener {
    onFactTypeChanged(): void;
}