import { Text, TouchableOpacity, View } from "react-native";
import { Mood } from "../dailyCheck.types";
import { getWeekDayStyle } from "../utils/checkInStyles";
import { openCheckIn } from "../utils/openCheckIn";

interface DayMoodCellProps {
    date: string;
    label: string;
    mood: Mood | null;
    isToday: boolean;
    isFuture: boolean;
}

// A face for a day you checked in, a quiet dot for the rest. Any day so far can be tapped to fill in or change
export default function DayMoodCell({ date, label, mood, isToday, isFuture }: DayMoodCellProps) {
    const style = getWeekDayStyle({ isToday, isFuture });
    return (
        <TouchableOpacity
            disabled={isFuture}
            onPress={() => openCheckIn(date)}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityState={{ disabled: isFuture }}
            accessibilityLabel={`${date}: ${mood?.label ?? "no check-in"}`}
            className="items-center"
        >
            <Text className={`text-xs mb-1 ${style.letter}`}>{label}</Text>
            <View className={`w-8 h-8 rounded-full items-center justify-center ${style.ring}`}>
                {mood
                    ? <Text className="text-lg">{mood.emoji}</Text>
                    : <View className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
            </View>
        </TouchableOpacity>
    );
}
