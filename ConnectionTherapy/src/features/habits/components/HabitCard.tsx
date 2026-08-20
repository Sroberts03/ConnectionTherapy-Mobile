import { useState, useEffect } from "react"
import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useHabitContext } from "../HabitContext";
import { usePillarContext } from "../../dashboard/PillarContext";
import * as LucideIcons from 'lucide-react-native';

interface HabitCardProps {
    habit: Habit
    setEditHabitId?: (id: number | undefined) => void;
    setDeleteHabitId?: (id: number | undefined) => void;
}

export default function HabitCard({ habit, setEditHabitId, setDeleteHabitId }: HabitCardProps) {
    const { pillars } = usePillarContext()
    const { toggleHabitComplete, setHabitError } = useHabitContext()
    const [isCompleted, setIsCompleted] = useState(habit.isCompleted);
    const pillar = pillars.get(habit.category)
    let color = "#B0A69D"
    let iconName = "Circle"
    let IconComponent = LucideIcons.Circle
    if (pillar) {
        color = pillar.color
        iconName = pillar.icon.charAt(0).toUpperCase() + pillar.icon.slice(1)
        IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Circle;
    }

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
            <View className="flex-row items-center justify-between border border-neutral-400 rounded-xl p-4 bg-white">
                <View className="flex-row items-center flex-1">
                    <View className="mr-4 items-center justify-center">
                        <IconComponent size={28} color={!isCompleted ? color : "#e0dcd4"} />
                    </View>
                    <View className="flex-1">
                        <Text className={`text-lg font-semibold ${isCompleted ? 'text-neutral-400 line-through' : 'text-black'}`}>{habit.name}</Text>
                        {habit.description && (
                            <Text className={`text-xs font-semibold ${isCompleted ? 'text-neutral-400 line-through' : 'text-neutral-700'}`}>{habit.description}</Text>
                        )}
                        <View className="flex-row items-center mt-1 gap-2">
                            <View className="rounded-md overflow-hidden px-2 py-0.5 justify-center items-center w-15 h-5">
                                <View 
                                    className="absolute top-0 left-0 right-0 bottom-0"
                                    style={{ backgroundColor: !isCompleted ? color : "#f5f5f5", opacity: !isCompleted ? 0.15 : 1 }} 
                                />
                                <Text 
                                    style={{ color: !isCompleted ? color : "#a3a3a3" }} 
                                    className={`text-[10px] font-semibold capitalize ${isCompleted ? 'line-through' : ''}`}
                                >
                                    {habit.category}
                                </Text>
                            </View>
                            <Text className={`text-xs ${isCompleted ? 'text-neutral-300 line-through' : 'text-neutral-900'}`}>{habit.duration}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="mr-3" onPress={() => completePressed()}>
                        <Ionicons name={isCompleted ? "checkmark-circle" : "ellipse-outline"} size={32} color={isCompleted ? "#14b850ff" : color} />
                    </TouchableOpacity>
                </View>
            </View>
        </ReanimatedSwipeable>
    )
}