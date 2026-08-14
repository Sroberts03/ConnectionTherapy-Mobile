import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TakeItOneWeekDialog() {
    return (
        <View className="flex-1 justify-center items-center px-8 py-20 mt-10">
            <View className="bg-teal-50 p-6 rounded-full mb-6">
                <Ionicons name="calendar-clear-outline" size={48} color="#0d9488" />
            </View>
            <Text className="text-2xl font-bold text-neutral-800 text-center mb-4">
                Let's take it one week at a time
            </Text>
            <Text className="text-base text-neutral-500 text-center leading-relaxed">
                Focusing on the present helps build lasting consistency. You can track this week, look back at your progress from last week, and plan one week into the future.
            </Text>
        </View>
    );
}