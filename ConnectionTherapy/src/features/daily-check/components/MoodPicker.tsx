import { Text, TouchableOpacity, View } from "react-native";
import { Mood, MoodKey } from "../dailyCheck.types";
import { MOODS } from "../utils/moods";
import { getMoodOptionStyle } from "../utils/checkInStyles";

interface MoodPickerProps {
    selected: MoodKey | null;
    onSelect: (mood: MoodKey) => void;
}

export default function MoodPicker({ selected, onSelect }: MoodPickerProps) {
    return (
        <View className="flex-row justify-between" accessibilityRole="radiogroup">
            {MOODS.map(mood => (
                <MoodOption
                    key={mood.key}
                    mood={mood}
                    isSelected={mood.key === selected}
                    hasSelection={selected !== null}
                    onSelect={onSelect}
                />
            ))}
        </View>
    );
}

interface MoodOptionProps {
    mood: Mood;
    isSelected: boolean;
    hasSelection: boolean;
    onSelect: (mood: MoodKey) => void;
}

function MoodOption({ mood, isSelected, hasSelection, onSelect }: MoodOptionProps) {
    const style = getMoodOptionStyle(isSelected, hasSelection);
    return (
        <TouchableOpacity
            onPress={() => onSelect(mood.key)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={mood.label}
            className={`items-center w-[18%] py-3 rounded-2xl border ${style.container}`}
        >
            <Text className={`text-3xl ${style.emoji}`}>{mood.emoji}</Text>
            <Text className={`text-xs mt-1 ${style.label}`}>{mood.label}</Text>
        </TouchableOpacity>
    );
}
