import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { openCheckIn } from "../utils/openCheckIn";
import { View, Text, TouchableOpacity } from "react-native";
import { useDailyChecks } from "../utils/useDailyChecks";
import { getCheckInSummary } from "../utils/getCheckInSummary";
import { Mood } from "../dailyCheck.types";
import WeekMoodStrip from "./WeekMoodStrip";

export default function GoToDailyCheck() {
    const { loading, todayCheck, week } = useDailyChecks();
    const summary = getCheckInSummary(todayCheck);
    if (loading) return null;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => openCheckIn()}
            accessibilityRole="button"
            accessibilityLabel={summary.accessibilityLabel}
            className="bg-white rounded-2xl w-full p-5 border border-neutral-300"
        >
            <View className="flex-row items-center mb-4">
                <CheckInBadge mood={summary.mood} />
                <View className="flex-1 ml-3">
                    <Text className="text-lg font-bold text-neutral-900">{summary.title}</Text>
                    <Text className="text-sm text-neutral-600" numberOfLines={1}>{summary.detail}</Text>
                </View>
                <Ionicons name={summary.mood ? "create-outline" : "chevron-forward"} size={20} color="#7d756b" />
            </View>
            <WeekMoodStrip week={week} />
            <TouchableOpacity
                onPress={() => router.push("/(daily-check)/History")}
                hitSlop={8}
                accessibilityRole="button"
                className="flex-row items-center justify-center mt-4 pt-3 border-t border-neutral-200"
            >
                <Text className="text-sm font-semibold text-primary-700 mr-1">See past check-ins</Text>
                <Ionicons name="chevron-forward" size={14} color="#4f6650" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

// Today's face once you've checked in; the sun until then
function CheckInBadge({ mood }: { mood: Mood | null }) {
    return (
        <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
            {mood
                ? <Text className="text-xl">{mood.emoji}</Text>
                : <Ionicons name="sunny-outline" size={20} color="#4f6650" />}
        </View>
    );
}
