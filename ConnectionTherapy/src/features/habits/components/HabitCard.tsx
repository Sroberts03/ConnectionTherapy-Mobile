import { useState, useEffect } from "react"
import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useHabitContext } from "../HabitContext";

interface HabitCardProps {
    habit: Habit
    setEditHabitId?: (id: number | undefined) => void;
    setDeleteHabitId?: (id: number | undefined) => void;
}

export default function HabitCard({ habit, setEditHabitId, setDeleteHabitId }: HabitCardProps) {
    const { toggleHabitComplete, setHabitError } = useHabitContext()
    const [isCompleted, setIsCompleted] = useState(habit.isCompleted);

    useEffect(() => {
        setIsCompleted(habit.isCompleted);
    }, [habit.isCompleted]);

    const completePressed = async () => {
        toggleHabitComplete(habit.id, isCompleted)
    }

    const renderRightActions = () => {
        if (!setEditHabitId || !setDeleteHabitId) return null;

        return (
            <View className="flex-row h-full">
                <TouchableOpacity
                    className="bg-blue-500 justify-center items-center w-16 h-full ml-2 rounded-xl"
                    onPress={() => {
                        setEditHabitId(habit.id)
                        setHabitError("")
                    }}
                >
                    <Ionicons name="pencil" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-red-500 justify-center items-center w-16 h-full ml-2 rounded-xl"
                    onPress={() => {
                        setDeleteHabitId(habit.id)
                        setHabitError("")
                    }}
                >
                    <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ReanimatedSwipeable renderRightActions={renderRightActions}>
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
        </ReanimatedSwipeable>
    )
}