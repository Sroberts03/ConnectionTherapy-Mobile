import { View, Text } from "react-native";
import { DAYS_OF_WEEK } from "../../utils/useCustomRepeat";
import { ToggleChip, toggleValue } from "./ToggleFunctions";

interface WeeklyRepeatPickerProps {
    isVisible: boolean
    byDay: string[];
    setByDay: (days: string[]) => void;
}


export default function WeeklyRepeatPicker({ byDay, setByDay, isVisible }: WeeklyRepeatPickerProps) {
    if (!isVisible) return null;
    return (
        <View className="mt-4">
            <Text className="text-xs text-neutral-500 mb-2">Repeat on</Text>
            <View className="flex-row justify-between">
                {DAYS_OF_WEEK.map((day) => (
                    <ToggleChip
                        key={day.value}
                        label={day.label}
                        selected={byDay.includes(day.value)}
                        onPress={() => setByDay(toggleValue(byDay, day.value))}
                    />
                ))}
            </View>
        </View>
    );
}