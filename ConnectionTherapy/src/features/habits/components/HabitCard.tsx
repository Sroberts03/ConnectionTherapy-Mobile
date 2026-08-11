import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface HabitCardProps {
    habit: Habit
}

export default function HabitCard({habit}: HabitCardProps) {
    return (
        <View className="flex-row items-center justify-between border border-neutral-200 rounded-xl p-4 bg-white">
            <View className="flex-row items-center flex-1">
                <TouchableOpacity className="mr-3">
                    <Ionicons name={habit.is_completed ? "checkmark-circle" : "ellipse-outline"} size={24} color={habit.is_completed ? "#14b8a6" : "#e5e7eb"} />
                </TouchableOpacity>
                <View className="flex-1">
                    <Text className="text-base font-semibold text-neutral-700">{habit.name}</Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-xs text-neutral-400 mr-2">{habit.duration}</Text>
                        <View className="bg-neutral-50 px-2 py-0.5 rounded">
                            <Text className="text-[10px] text-neutral-500 capitalize">{habit.category}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}