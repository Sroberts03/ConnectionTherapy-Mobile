import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";


interface GoToDailyCheckProps {
    isVisible: boolean;
}

// Check-ins aren't built yet, so this previews them instead of offering a button
// that leads to an empty screen. Swap the badge for a button to /(daily-check)/DailyCheck once they ship.
export default function GoToDailyCheck( { isVisible }: GoToDailyCheckProps ) {
    if (!isVisible) return null;

    return (
        <View
            className="rounded-2xl w-full p-5 border border-dashed border-primary-300"
            accessible
            accessibilityLabel="Daily check-ins, coming soon"
        >
            <View className="flex-row items-center justify-between mb-3">
                <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
                    <Ionicons name="sunny-outline" size={20} color="#4f6650" />
                </View>
                <View className="px-2.5 py-1 rounded-full bg-primary-100">
                    <Text className="text-xs font-semibold text-primary-700">Coming soon</Text>
                </View>
            </View>
            <Text className="text-lg font-bold text-neutral-900 mb-1">
                Daily check-ins
            </Text>
            <Text className="text-base text-neutral-600 leading-6">
                A minute each day to notice how you&apos;re feeling, before the day carries you along.
            </Text>
        </View>
    )
}
