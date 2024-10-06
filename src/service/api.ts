import ICatsFactResult from "../domain/facts/catFact";

export async function catFactsAPI(): Promise<ICatsFactResult> {
    const apiUrl = process.env.REACT_APP_FACTS_CATS_URL || '';
    const response = await fetch(apiUrl, {
        mode: 'cors',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as ICatsFactResult;
}
