import { View, Text } from "react-native";
import { ToggleChip, toggleValue } from "./ToggleFunctions";

interface MonthlyDayGridProps {
    isVisible: boolean;
    byMonthDay: number[];
    setByMonthDay: (days: number[]) => void;
}

export default function MonthlyDayGrid({ isVisible, byMonthDay, setByMonthDay }: MonthlyDayGridProps) {
    if (!isVisible) return null;

    return (
        <View>
            <Text className="text-xs text-neutral-500 mb-2">Select days of the month</Text>
            <View className="flex-row flex-wrap gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <ToggleChip
                        key={day}
                        label={day}
                        size="w-8 h-8"
                        selected={byMonthDay.includes(day)}
                        onPress={() => setByMonthDay(toggleValue(byMonthDay, day))}
                    />
                ))}
            </View>
        </View>
    );
}