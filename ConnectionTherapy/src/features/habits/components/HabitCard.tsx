import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { getPillarTheme } from "../utils/getPillarTheme";
import { useHabitCompletion } from "../utils/useHabitCompletion";
import { getHabitCardStyle } from "../utils/getHabitCardStyle";

interface HabitCardProps {
    habit: Habit
    setEditHabitId?: (id: number | undefined) => void;
    setDeleteHabitId?: (id: number | undefined) => void;
}

export default function HabitCard({ habit, setEditHabitId, setDeleteHabitId }: HabitCardProps) {
    const { isCompleted, toggleHabitComplete, setHabitError } = useHabitCompletion(habit);
    const { color, IconComponent } = getPillarTheme(habit.category);
    const { 
        iconColor, 
        nameClassName, 
        descriptionClassName, 
        categoryBackgroundColor, 
        categoryOpacity, 
        categoryTextColor, 
        categoryTextClassName, 
        durationClassName, 
        checkIconName, 
        checkIconColor 
    } = getHabitCardStyle(isCompleted, color);

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
                        <IconComponent size={28} color={iconColor} />
                    </View>
                    <View className="flex-1">
                        <Text className={nameClassName}>{habit.name}</Text>
                        {habit.description && (
                            <Text className={descriptionClassName}>{habit.description}</Text>
                        )}
                        <View className="flex-row items-center mt-1 gap-2">
                            <View className="rounded-md overflow-hidden px-2 py-0.5 justify-center items-center w-15 h-5">
                                <View 
                                    className="absolute top-0 left-0 right-0 bottom-0"
                                    style={{ backgroundColor: categoryBackgroundColor, opacity: categoryOpacity }} 
                                />
                                <Text 
                                    style={{ color: categoryTextColor }} 
                                    className={categoryTextClassName}
                                >
                                    {habit.category}
                                </Text>
                            </View>
                            <Text className={durationClassName}>{habit.duration}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="mr-3" onPress={() => completePressed()}>
                        <Ionicons name={checkIconName} size={32} color={checkIconColor} />
                    </TouchableOpacity>
                </View>
            </View>
        </ReanimatedSwipeable>
    )
}