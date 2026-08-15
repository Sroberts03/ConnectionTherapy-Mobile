import { Text, TextInput, View } from "react-native"

interface HabitNameInputProps {
    name: string;
    setName: (name: string) => void;
}

export default function HabitNameInput({ name, setName }: HabitNameInputProps) {
    return (
        <View className="mb-5">
            <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Habit Name</Text>
            <TextInput 
                className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-base text-neutral-800"
                placeholder="e.g. Read a book"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
            />
        </View>
    );
}