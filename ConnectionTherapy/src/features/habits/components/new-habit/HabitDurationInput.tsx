import { View, Text, TextInput } from "react-native";

interface HabitDurationInputProps {
    duration: string
    setDuration: (duration: string) => void
}

export default function HabitDurationInput({ duration, setDuration }: HabitDurationInputProps) {
    return (
        <View className="mb-5">
            <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Duration / Goal</Text>
            <TextInput 
                className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-base text-neutral-800"
                placeholder="e.g. 30 mins, 1 chapter"
                placeholderTextColor="#9ca3af"
                value={duration}
                onChangeText={setDuration}
            />
        </View> 
    );
}