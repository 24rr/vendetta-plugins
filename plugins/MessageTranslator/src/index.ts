import { logger } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import { ReactNative as RN } from "@vendetta/metro/common";
import { createFileUrl } from "@vendetta/metro/common/assets";
import Settings from "./Settings";
import TranslationModal from "./components/TranslationModal";

const MessageActions = findByProps("openMessageModal");
const { showModal } = findByProps("showModal");

let unpatch: Function;

export default {
    onLoad: () => {
        // Patch the long-press menu to add our translate option
        unpatch = MessageActions.openMessageModal.after((ctx: any) => {
            const message = ctx.args[0];
            
            // Add our translate button to the message actions
            ctx.result.props.children.props.children.push({
                label: "Translate",
                icon: createFileUrl("ic_translate"),
                onPress: () => {
                    showModal({
                        key: "translate-modal",
                        modal: {
                            children: () => RN.createElement(TranslationModal, {
                                message: message,
                                channelId: message.channel_id,
                                close: () => findByProps("popModal").popModal()
                            }),
                            closable: true,
                            title: "Translate Message"
                        }
                    });
                }
            });
        });

        logger.log("Message Translator plugin loaded!");
    },
    onUnload: () => {
        unpatch?.();
        logger.log("Message Translator plugin unloaded.");
    },
    settings: Settings,
}