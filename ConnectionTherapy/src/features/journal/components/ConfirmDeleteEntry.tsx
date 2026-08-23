import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useJournalContext } from "../journal.context";
import { Ionicons } from "@expo/vector-icons";

interface ConfirmDeleteEntryProps {
    isVisible: boolean;
    entryId: number;
    onClose: () => void;
}

export default function ConfirmDeleteEntry({ isVisible, entryId, onClose }: ConfirmDeleteEntryProps) {
    const { deleteEntry } = useJournalContext();

    if (!isVisible) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center bg-black/50 px-6">
                <View className="bg-white rounded-3xl p-6 w-full items-center shadow-lg">
                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 bg-red-50`}>
                        <Ionicons name="warning-outline" size={32} color="#ef4444" />
                    </View>
                    
                    <Text className="text-xl font-bold text-neutral-900 mb-2">
                        Delete Journal Entry
                    </Text>
                    
                    <Text className="text-center text-base text-neutral-600 mb-8 leading-6">
                        Are you sure you want to delete this journal entry? This action cannot be undone.
                    </Text>
                    
                    <TouchableOpacity 
                        onPress={() => {
                            deleteEntry(entryId);
                            onClose();
                        }}
                        className="w-full bg-red-600 py-4 rounded-xl items-center active:opacity-80 mb-3"
                    >
                        <Text className="text-white font-semibold text-base">Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={onClose}
                        className="w-full bg-neutral-200 py-4 rounded-xl items-center active:opacity-80"
                    >
                        <Text className="text-neutral-700 font-semibold text-base">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}