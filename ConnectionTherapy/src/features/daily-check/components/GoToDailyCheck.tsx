import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";


interface GoToDailyCheckProps {
    isVisible: boolean;
}
export default function GoToDailyCheck( { isVisible }: GoToDailyCheckProps ) {
    const router = useRouter();
    if (!isVisible) return null;

    return (
        <View className="flex-1 items-center justify-center bg-neutral-300 rounded-2xl w-full h-60 p-4 border border-primary-200">
            <Text className="text-md font-bold mb-2 text-center">
                You haven&apos;t completed your daily check-in yet!
            </Text>
            <Text className="text-center">
                Take some time to check in and reflect on your day. 
                This is a great way to stay mindful and track your progress.
            </Text>
            <TouchableOpacity 
                className="bg-primary-300 px-4 py-2 rounded-lg mt-4 flex-row items-center justify-center gap-2"
                onPress={() => router.push("/(daily-check)/DailyCheck")}
            >
                <Text>Go To Daily Check In</Text>
                <Ionicons name="arrow-forward" size={16} color="black" />   
            </TouchableOpacity>
        </View>
    )
}