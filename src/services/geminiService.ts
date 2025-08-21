import { LottoResult } from '@/types';

export const generateLottoNumbers = async (): Promise<LottoResult> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        const result: LottoResult = await response.json();
        
        // Basic validation of the received data
        if (
            !result.numbers || 
            !Array.isArray(result.numbers) ||
            result.numbers.length !== 6 ||
            typeof result.analysis !== 'string'
        ) {
            throw new Error("Invalid data format received from server.");
        }

        return result;

    } catch (error) {
        console.error("Error fetching lotto numbers:", error);
        throw new Error("Failed to generate numbers.");
    }
};