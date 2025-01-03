const GOOGLE_TRANSLATE_API = "https://translate.googleapis.com/translate_a/single";

export interface TranslationResult {
    translatedText: string;
    detectedLanguage: string;
}

export async function translateText(text: string, targetLang: string = "en"): Promise<TranslationResult> {
    try {
        const params = new URLSearchParams({
            client: "gtx",
            sl: "auto",
            tl: targetLang,
            dt: "t",
            q: text
        });

        const response = await fetch(`${GOOGLE_TRANSLATE_API}?${params}`);
        const data = await response.json();

        return {
            translatedText: data[0][0][0],
            detectedLanguage: data[2]
        };
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
} 