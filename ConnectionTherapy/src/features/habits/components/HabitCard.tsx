import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity, Animated } from "react-native"
import { useRef } from "react"
import { Ionicons } from "@expo/vector-icons"
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { getPillarTheme } from "../utils/getPillarTheme";
import { useHabitCompletion } from "../utils/useHabitCompletion";
import { getHabitCardStyle } from "../utils/getHabitCardStyle";

interface HabitCardProps {
    habit: Habit
    setEditHabitId?: (id: number | undefined) => void;
    setDeleteHabitId?: (id: number | undefined) => void;
    // Hidden inside a pillar's own section, where the chip just repeats the header
    showCategory?: boolean;
    // Inside a pillar card the habit is a plain row; on its own it's a bordered card
    nested?: boolean;
}

export default function HabitCard({ habit, setEditHabitId, setDeleteHabitId, showCategory = true, nested = false }: HabitCardProps) {
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

    const checkScale = useRef(new Animated.Value(1)).current;
    const swipeableRef = useRef<SwipeableMethods>(null);
    const canEdit = !!setEditHabitId && !!setDeleteHabitId;
    const showDescription = !!habit.description && habit.description.trim().toLowerCase() !== habit.name.trim().toLowerCase();

    const completePressed = async () => {
        if (!isCompleted) {
            checkScale.setValue(0.6);
            Animated.spring(checkScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
        }
        toggleHabitComplete(habit.id, isCompleted)
    }

    const renderRightActions = () => {
        if (!setEditHabitId || !setDeleteHabitId) return null;

        return (
            <View className="flex-row h-full">
                <TouchableOpacity
                    className="bg-primary-600 justify-center items-center w-16 h-full ml-2 rounded-xl"
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
        <ReanimatedSwipeable ref={swipeableRef} renderRightActions={renderRightActions}>
            {/* Long-press is a second way in for anyone who doesn't think to swipe */}
            <TouchableOpacity
                activeOpacity={1}
                disabled={!canEdit}
                delayLongPress={350}
                onLongPress={() => swipeableRef.current?.openRight()}
                accessibilityHint={canEdit ? "Long-press or swipe left to edit or delete" : undefined}
            >
            <View className={`flex-row items-center justify-between ${nested ? "py-3 bg-white" : "rounded-xl p-4 border border-neutral-300 bg-white"}`}>
                <View className="flex-row items-center flex-1">
                    <View className="mr-4 items-center justify-center">
                        <IconComponent size={28} color={iconColor} />
                    </View>
                    <View className="flex-1">
                        <Text className={nameClassName}>{habit.name}</Text>
                        {showDescription && (
                            <Text className={descriptionClassName}>{habit.description}</Text>
                        )}
                        <View className="flex-row items-center mt-1 gap-2">
                            {showCategory && (
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
                            )}
                            {isCompleted ? (
                                <Text className={durationClassName} style={{ color }}>Done for today 🌱</Text>
                            ) : (
                                <Text className={durationClassName}>{habit.duration}</Text>
                            )}
                        </View>
                    </View>
                    <TouchableOpacity
                        className="mr-3"
                        onPress={() => completePressed()}
                        hitSlop={8}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: isCompleted }}
                        accessibilityLabel={`Mark ${habit.name} done`}
                    >
                        <Animated.View style={{ transform: [{ scale: checkScale }] }}>
                            <Ionicons name={checkIconName} size={32} color={checkIconColor} />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableOpacity>
        </ReanimatedSwipeable>
    )
}