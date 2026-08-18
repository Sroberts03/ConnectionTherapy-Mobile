import { useState, useEffect } from "react"
import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSQLiteContext } from "expo-sqlite";
import { toggleComplete } from "../services/habits.service";

interface HabitCardProps {
    habit: Habit
}

export default function HabitCard({ habit }: HabitCardProps) {
    const db = useSQLiteContext();
    const [isCompleted, setIsCompleted] = useState(habit.isCompleted);

    useEffect(() => {
        setIsCompleted(habit.isCompleted);
    }, [habit.isCompleted]);

    const completePressed = async () => {
        const targetState = !isCompleted;
        try {
            await toggleComplete(habit.id, targetState, db);
            setIsCompleted(targetState);
            habit.isCompleted = targetState;
        } catch {
            Alert.alert("Error toggling complete")
        }
    }

    return (
        <View className="flex-row items-center justify-between border border-neutral-200 rounded-xl p-4 bg-white">
            <View className="flex-row items-center flex-1">
                <TouchableOpacity className="mr-3" onPress={() => completePressed()}>
                    <Ionicons name={isCompleted ? "checkmark-circle" : "ellipse-outline"} size={24} color={isCompleted ? "#14b850ff" : "#e5e7eb"} />
                </TouchableOpacity>
                <View className="flex-1">
                    <Text className={`text-base font-semibold ${isCompleted ? 'text-neutral-400 line-through' : 'text-neutral-700'}`}>{habit.name}</Text>
                    <Text className={`text-xs font-semibold ${isCompleted ? 'text-neutral-400 line-through' : 'text-neutral-700'}`}>{habit.description}</Text>
                    <View className="flex-row items-center mt-1">
                        <Text className={`text-xs mr-2 ${isCompleted ? 'text-neutral-300 line-through' : 'text-neutral-400'}`}>{habit.duration}</Text>
                        <View className={`px-2 py-0.5 rounded ${isCompleted ? 'bg-neutral-100' : 'bg-neutral-50'}`}>
                            <Text className={`text-[10px] capitalize ${isCompleted ? 'text-neutral-400 line-through' : 'text-neutral-500'}`}>{habit.category}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}