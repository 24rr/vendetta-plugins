import { Forms } from "@vendetta/ui/components";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";

const { FormSelect, FormText } = Forms;

// Initialize storage with default values
storage.targetLanguage ??= "en";

const LANGUAGES = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese (Simplified)"
};

export default () => {
    useProxy(storage);

    return (
        <>
            <FormText>Configure your translation preferences</FormText>
            <FormSelect
                label="Target Language"
                value={storage.targetLanguage}
                options={Object.entries(LANGUAGES).map(([value, label]) => ({ label, value }))}
                onChange={(value: string) => storage.targetLanguage = value}
            />
        </>
    );
}