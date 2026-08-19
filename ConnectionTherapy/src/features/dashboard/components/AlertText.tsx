import { ConnectionPillar } from "../dashboard.types";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertTextProps {
    pillar: ConnectionPillar
    isVisible: boolean
    onClose: () => void
}

export default function AlertText({ pillar, isVisible, onClose }: AlertTextProps) {
    const { danger, concern, name } = pillar;
    if (!isVisible) return null;

    const isDanger = danger;
    const iconName = isDanger ? "warning" : "alert-circle";
    const iconColor = isDanger ? "#ef4444" : "#f59e0b";
    const bgColor = isDanger ? "bg-red-50" : "bg-amber-50";
    const title = isDanger ? "Action Required" : "Needs Attention";
    
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
                        {isDanger 
                            ? `Your ${name} pillar is currently in danger. Please take some time to check in with yourself and make sure you're getting the support you need.` 
                            : concern 
                            ? `Your ${name} pillar is showing some signs of concern. Consider focusing some energy here soon.` 
                            : ""
                        }
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