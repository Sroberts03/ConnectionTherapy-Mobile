import { View } from "react-native";
import { DAY_OF_MONTH_INTERVAL_OPTIONS, DayOfMonthInterval, DAYS_OF_WEEK } from "../../utils/useCustomRepeat";
import { Picker } from "@react-native-picker/picker";

interface MonthlyIntervalPickerProps {
    isVisible: boolean;
    dayOfMonthInterval: DayOfMonthInterval;
    setDayOfMonthInterval: (v: DayOfMonthInterval) => void;
    byDay: string[];
    setByDay: (days: string[]) => void;
}

export default function MonthlyIntervalPicker({
    isVisible, dayOfMonthInterval, setDayOfMonthInterval, byDay, setByDay,
}: MonthlyIntervalPickerProps) {
    if (!isVisible) return null;

    return (
        <View className="flex-row items-center bg-white rounded-lg border border-neutral-200 mt-2">
            <View className="flex-1">
                <Picker selectedValue={dayOfMonthInterval || "1"} onValueChange={(v) => setDayOfMonthInterval(v as DayOfMonthInterval)}>
                    {DAY_OF_MONTH_INTERVAL_OPTIONS.map((opt) => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                </Picker>
            </View>
            <View className="flex-1">
                <Picker selectedValue={byDay[0] || "SU"} onValueChange={(v) => setByDay([v])}>
                    {DAYS_OF_WEEK.map((day) => (
                        <Picker.Item key={day.value} label={day.label} value={day.value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}