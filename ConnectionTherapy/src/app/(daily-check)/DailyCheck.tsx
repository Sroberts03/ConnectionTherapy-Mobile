import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@src/globalComponents/BackButton";
import ScreenHeader from "@src/globalComponents/ScreenHeader";

export default function DailyCheckScreen() {
    return (
        <SafeAreaView className="flex-1 bg-primary-50">
            <View className="flex-row items-center justify-center relative px-4 pt-2">
                <BackButton className="absolute left-4 top-2 z-10" />
                <ScreenHeader title="Daily Check-in" titleClassName="text-lg font-bold text-center text-text-primary px-8" />
            </View>
            <View className="flex-1 items-center justify-center px-8">
                <View className="w-16 h-16 rounded-full bg-primary-100 items-center justify-center mb-4">
                    <Ionicons name="sunny-outline" size={32} color="#4f6650" />
                </View>
                <Text className="text-lg font-bold text-neutral-900 text-center">Check-ins are on their way</Text>
                <Text className="text-base text-neutral-600 text-center mt-2 leading-6">
                    Soon you&apos;ll be able to log how you feel each day and see it alongside your pillars.
                </Text>
            </View>
        </SafeAreaView>
    )
}
