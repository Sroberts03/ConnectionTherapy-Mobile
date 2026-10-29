import { Text, View } from "react-native";
import { Streak } from "../progress.types";
import { getStreakCopy } from "../utils/getStreakCopy";

export default function StreakBanner({ streak }: { streak: Streak }) {
    const { title, detail } = getStreakCopy(streak);
    return (
        <View className="flex-row items-center bg-white rounded-2xl p-4 border border-neutral-300 mb-4" accessible accessibilityLabel={`${title}. ${detail}`}>
            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
                <Text className="text-xl">{streak.current > 0 ? "🔥" : "🌱"}</Text>
            </View>
            <View className="flex-1 ml-3">
                <Text className="text-lg font-bold text-neutral-900">{title}</Text>
                <Text className="text-sm text-neutral-600">{detail}</Text>
            </View>
        </View>
    );
}
