import { View } from "react-native";
import { WeekDay } from "../dailyCheck.types";
import DayMoodCell from "./DayMoodCell";

export default function WeekMoodStrip({ week }: { week: WeekDay[] }) {
    return (
        <View className="flex-row justify-between">
            {week.map(day => (
                <View key={day.date} className="w-[13%] items-center">
                    <DayMoodCell date={day.date} label={day.letter} mood={day.mood} isToday={day.isToday} isFuture={day.isFuture} />
                </View>
            ))}
        </View>
    );
}
