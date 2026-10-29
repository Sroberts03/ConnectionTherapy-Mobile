import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatMonthTitle } from "../utils/getMonthGrid";

interface MonthSwitcherProps {
    monthStart: string;
    canGoForward: boolean;
    onChange: (months: number) => void;
}

export default function MonthSwitcher({ monthStart, canGoForward, onChange }: MonthSwitcherProps) {
    return (
        <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => onChange(-1)} hitSlop={12} accessibilityRole="button" accessibilityLabel="Previous month">
                <Ionicons name="chevron-back" size={22} color="#312c28" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-neutral-900">{formatMonthTitle(monthStart)}</Text>
            <TouchableOpacity
                onPress={() => onChange(1)}
                disabled={!canGoForward}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Next month"
                accessibilityState={{ disabled: !canGoForward }}
            >
                <Ionicons name="chevron-forward" size={22} color={canGoForward ? "#312c28" : "#d6d3d1"} />
            </TouchableOpacity>
        </View>
    );
}
