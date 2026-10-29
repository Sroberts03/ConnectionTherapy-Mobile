import { Text, TouchableOpacity, View } from "react-native";
import { DailyCheck } from "../dailyCheck.types";
import { describeCheckIn } from "../utils/getCheckInSummary";
import { openCheckIn } from "../utils/openCheckIn";

export default function CheckInHistoryList({ checks }: { checks: DailyCheck[] }) {
    if (checks.length === 0) {
        return <Text className="text-sm text-neutral-600 text-center py-6">No check-ins this month. Tap a day above to add one.</Text>;
    }
    return (
        <View className="bg-white rounded-2xl px-4 border border-neutral-300">
            {[...checks].reverse().map((check, index) => (
                <CheckInHistoryRow key={check.id} check={check} isLast={index === checks.length - 1} />
            ))}
        </View>
    );
}

function CheckInHistoryRow({ check, isLast }: { check: DailyCheck, isLast: boolean }) {
    const { emoji, title } = describeCheckIn(check);
    return (
        <TouchableOpacity
            onPress={() => openCheckIn(check.date)}
            accessibilityRole="button"
            className={`flex-row items-center py-3 ${isLast ? "" : "border-b border-neutral-200"}`}
        >
            <Text className="text-2xl mr-3">{emoji}</Text>
            <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">{title}</Text>
                {check.notes && <Text className="text-sm text-neutral-600 mt-0.5">{check.notes}</Text>}
            </View>
        </TouchableOpacity>
    );
}
