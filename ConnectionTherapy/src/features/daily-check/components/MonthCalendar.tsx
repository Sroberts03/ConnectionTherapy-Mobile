import { Text, View } from "react-native";
import { CalendarDay } from "../utils/getMonthGrid";
import DayMoodCell from "./DayMoodCell";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function MonthCalendar({ rows }: { rows: (CalendarDay | null)[][] }) {
    return (
        <View>
            <View className="flex-row">
                {WEEKDAYS.map((letter, index) => (
                    <Text key={index} className="flex-1 text-center text-xs text-neutral-500 mb-2">{letter}</Text>
                ))}
            </View>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row mb-2">
                    {row.map((day, index) => (
                        <View key={day?.date ?? `blank-${index}`} className="flex-1 items-center">
                            {day && <DayMoodCell date={day.date} label={String(day.dayNumber)} mood={day.mood} isToday={day.isToday} isFuture={day.isFuture} />}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}
