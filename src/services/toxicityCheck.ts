const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL;

export interface ToxicityResult {
    comment: string;
    result: 'Abusive' | 'Neutral' | 'Safe';
    error?: string;
}

export async function checkCommentToxicity(comment: string): Promise<ToxicityResult> {
    try {
        const response = await fetch(`${FLASK_API_URL}/check_comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        });

        if (!response.ok) {
            throw new Error('Failed to check comment toxicity');
        }

        return await response.json();
    } catch (error) {
        console.error('Toxicity check error:', error);
        throw new Error('Unable to verify comment safety. Please try again.');
    }
}