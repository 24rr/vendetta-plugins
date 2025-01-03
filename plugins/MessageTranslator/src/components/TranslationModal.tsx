import { ReactNative as RN } from "@vendetta/metro/common";
import { Forms, General } from "@vendetta/ui/components";
import { semanticColors } from "@vendetta/ui";
import { translateText } from "../api/translator";
import { findByProps } from "@vendetta/metro";

const { FormRow } = Forms;
const { Text, View } = General;
const MessageActions = findByProps("editMessage");

interface TranslationModalProps {
    message: any;
    channelId: string;
    close: () => void;
}

export default function TranslationModal({ message, channelId, close }: TranslationModalProps) {
    const [translatedText, setTranslatedText] = RN.useState("");
    const [loading, setLoading] = RN.useState(true);

    RN.useEffect(() => {
        async function performTranslation() {
            try {
                const result = await translateText(message.content);
                setTranslatedText(result.translatedText);
            } catch (error) {
                setTranslatedText("Translation failed");
            } finally {
                setLoading(false);
            }
        }
        performTranslation();
    }, []);

    const applyTranslation = () => {
        MessageActions.editMessage(channelId, message.id, { content: translatedText });
        close();
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ color: semanticColors.HEADER_PRIMARY, fontSize: 16, marginBottom: 16 }}>
                Original: {message.content}
            </Text>
            
            {loading ? (
                <Text style={{ color: semanticColors.HEADER_SECONDARY }}>Translating...</Text>
            ) : (
                <>
                    <Text style={{ color: semanticColors.HEADER_PRIMARY, fontSize: 16, marginBottom: 16 }}>
                        Translated: {translatedText}
                    </Text>
                    <FormRow
                        label="Apply Translation"
                        onPress={applyTranslation}
                    />
                </>
            )}
        </View>
    );
} 