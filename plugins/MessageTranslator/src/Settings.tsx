import { ReactNative as RN } from "@vendetta/metro/common";
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

    return RN.createElement(
        RN.Fragment,
        null,
        RN.createElement(FormText, null, "Configure your translation preferences"),
        RN.createElement(FormSelect, {
            label: "Target Language",
            value: storage.targetLanguage,
            options: Object.entries(LANGUAGES).map(([value, label]) => ({ label, value })),
            onChange: (value: string) => storage.targetLanguage = value
        })
    );
}