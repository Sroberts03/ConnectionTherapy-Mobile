import { TouchableOpacity, Text } from "react-native";

export function toggleValue<T>(array: T[], value: T): T[] {
    return array.includes(value) ? array.filter(v => v !== value) : [...array, value];
}

export function ToggleChip({
    label, selected, onPress, size = "w-10 h-10",
}: { label: string | number; selected: boolean; onPress: () => void; size?: string }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${size} rounded-full items-center justify-center border ${selected ? "bg-primary-600 border-primary-600" : "bg-white border-neutral-200"}`}
        >
            <Text className={`text-xs ${selected ? "text-white font-semibold" : "text-neutral-600"}`}>{label}</Text>
        </TouchableOpacity>
    );
}