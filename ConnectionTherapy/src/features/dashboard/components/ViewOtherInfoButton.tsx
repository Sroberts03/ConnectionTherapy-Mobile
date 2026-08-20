import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router/build/global-state/router";
import { View, Text, TouchableOpacity } from "react-native";

interface ViewOtherInfoButtonProps {
    onPress: () => void;
    text?: string;
}

export default function ViewOtherInfoButton({ onPress, text }: ViewOtherInfoButtonProps) {
    return (
        <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-bold text-neutral-900">Today's Top Habits</Text>
            <TouchableOpacity onPress={onPress} className="flex-row items-center gap-1">
                <Text className="text-primary-700 font-medium">{text || "View All Habits"}</Text>
                <Ionicons name="chevron-forward" size={18} color="#222222" />
            </TouchableOpacity>
        </View>
    )
}