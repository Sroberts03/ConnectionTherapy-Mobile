import { Habit } from "../habits.types"
import { View, Text, TouchableOpacity, Animated } from "react-native"
import { useRef } from "react"
import { Ionicons } from "@expo/vector-icons"
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { getPillarTheme } from "../utils/getPillarTheme";
import { useHabitCompletion } from "../utils/useHabitCompletion";
import { getHabitCardStyle, shouldShowDescription } from "../utils/getHabitCardStyle";

interface HabitCardProps {
    habit: Habit
    setEditHabitId?: (id: number | undefined) => void;
    setDeleteHabitId?: (id: number | undefined) => void;
    // Hidden inside a pillar's own section, where the chip just repeats the header
    showCategory?: boolean;
    // Inside a pillar card the habit is a plain row; on its own it's a bordered card
    nested?: boolean;
}

type HabitCardStyle = ReturnType<typeof getHabitCardStyle>;

export default function HabitCard({ habit, setEditHabitId, setDeleteHabitId, showCategory = true, nested = false }: HabitCardProps) {
    const { isCompleted, toggleHabitComplete, setHabitError } = useHabitCompletion(habit);
    const { color, IconComponent } = getPillarTheme(habit.category);
    const style = getHabitCardStyle(isCompleted, color);
    const checkScale = useRef(new Animated.Value(1)).current;
    const swipeableRef = useRef<SwipeableMethods>(null);
    const canEdit = !!setEditHabitId && !!setDeleteHabitId;

    const completePressed = () => {
        if (!isCompleted) {
            checkScale.setValue(0.6);
            Animated.spring(checkScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
        }
        toggleHabitComplete(habit.id, isCompleted)
    }

    const runAction = (setId?: (id: number | undefined) => void) => () => {
        setId?.(habit.id)
        setHabitError("")
    }

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            renderRightActions={() => canEdit && (
                <HabitSwipeActions onEdit={runAction(setEditHabitId)} onDelete={runAction(setDeleteHabitId)} />
            )}
        >
            {/* Long-press is a second way in for anyone who doesn't think to swipe */}
            <TouchableOpacity
                activeOpacity={1}
                disabled={!canEdit}
                delayLongPress={350}
                onLongPress={() => swipeableRef.current?.openRight()}
                accessibilityHint="Long-press or swipe left to edit or delete"
            >
                <View className={`flex-row items-center justify-between ${nested ? "py-3 bg-white" : "rounded-xl p-4 border border-neutral-300 bg-white"}`}>
                    <View className="flex-row items-center flex-1">
                        <View className="mr-4 items-center justify-center">
                            <IconComponent size={28} color={style.iconColor} />
                        </View>
                        <HabitDetails habit={habit} style={style} color={color} isCompleted={isCompleted} showCategory={showCategory} />
                        <TouchableOpacity
                            className="mr-3"
                            onPress={completePressed}
                            hitSlop={8}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: isCompleted }}
                            accessibilityLabel={`Mark ${habit.name} done`}
                        >
                            <Animated.View style={{ transform: [{ scale: checkScale }] }}>
                                <Ionicons name={style.checkIconName} size={32} color={style.checkIconColor} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </ReanimatedSwipeable>
    )
}

interface HabitDetailsProps {
    habit: Habit
    style: HabitCardStyle
    color: string
    isCompleted: boolean
    showCategory: boolean
}

function HabitDetails({ habit, style, color, isCompleted, showCategory }: HabitDetailsProps) {
    return (
        <View className="flex-1">
            <Text className={style.nameClassName}>{habit.name}</Text>
            {shouldShowDescription(habit.name, habit.description) && (
                <Text className={style.descriptionClassName}>{habit.description}</Text>
            )}
            <View className="flex-row items-center mt-1 gap-2">
                {showCategory && <CategoryChip category={habit.category} style={style} />}
                <HabitStatusLine duration={habit.duration} isCompleted={isCompleted} color={color} className={style.durationClassName} />
            </View>
        </View>
    )
}

interface HabitStatusLineProps {
    duration: string
    isCompleted: boolean
    color: string
    className: string
}

// Swaps the goal for a small win once the habit is done
function HabitStatusLine({ duration, isCompleted, color, className }: HabitStatusLineProps) {
    if (isCompleted) {
        return <Text className={className} style={{ color }}>Done for today 🌱</Text>;
    }
    return <Text className={className}>{duration}</Text>;
}

function CategoryChip({ category, style }: { category: string, style: HabitCardStyle }) {
    return (
        <View className="rounded-md overflow-hidden px-2 py-0.5 justify-center items-center w-15 h-5">
            <View
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{ backgroundColor: style.categoryBackgroundColor, opacity: style.categoryOpacity }}
            />
            <Text style={{ color: style.categoryTextColor }} className={style.categoryTextClassName}>
                {category}
            </Text>
        </View>
    )
}

function HabitSwipeActions({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) {
    return (
        <View className="flex-row h-full">
            <TouchableOpacity
                className="bg-primary-600 justify-center items-center w-16 h-full ml-2 rounded-xl"
                onPress={onEdit}
                accessibilityLabel="Edit habit"
            >
                <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-red-500 justify-center items-center w-16 h-full ml-2 rounded-xl"
                onPress={onDelete}
                accessibilityLabel="Delete habit"
            >
                <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}
