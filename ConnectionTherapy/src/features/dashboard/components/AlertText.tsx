import { ConnectionPillar } from "../dashboard.types";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import getAlertTheme from "../utils/getAlertTheme";

interface AlertTextProps {
    pillar: ConnectionPillar
    isVisible: boolean
    onClose: () => void
}

export default function AlertText({ pillar, isVisible, onClose }: AlertTextProps) {
    const { danger, concern, name } = pillar;
    if (!isVisible) return null;
    const { iconName, iconColor, bgColor, title, text } = getAlertTheme(danger, name);
    
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center bg-black/50 px-6">
                <View className="bg-white rounded-3xl p-6 w-full items-center shadow-lg">
                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${bgColor}`}>
                        <Ionicons name={iconName} size={32} color={iconColor} />
                    </View>
                    
                    <Text className="text-xl font-bold text-neutral-900 mb-2">
                        {title}
                    </Text>
                    
                    <Text className="text-center text-base text-neutral-600 mb-8 leading-6">
                        {text}
                    </Text>
                    
                    <TouchableOpacity 
                        onPress={onClose}
                        className="w-full bg-primary-600 py-4 rounded-xl items-center active:opacity-80"
                    >
                        <Text className="text-white font-semibold text-base">Got it</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}