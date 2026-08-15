import { View, Text, TextInput } from "react-native";

interface HabitDescInputProps {
    description: string
    setDescription: (description: string) => void
}

export default function HabitDescInput({ description, setDescription }: HabitDescInputProps) {
    return (
        <View className="mb-5">
            <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Description (Optional)</Text>
            <TextInput 
                className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-base text-neutral-800"
                placeholder="e.g. Read 10 pages before bed"
                placeholderTextColor="#9ca3af"
                value={description}
                onChangeText={setDescription}
                multiline
            />
        </View>
    );
}