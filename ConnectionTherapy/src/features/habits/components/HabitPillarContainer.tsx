import { Text, View, TouchableOpacity } from "react-native"
import { HabitCategory } from "../habits.types"
import HabitCard from "./HabitCard"
import { Ionicons } from "@expo/vector-icons"
import NewHabit from "./new-habit/NewHabit"
import { useState } from "react"
import ConfirmDeleteHabit from "./ConfirmDeleteHabit"
import { useHabitContext } from "../HabitContext"
import { getPillarTheme } from "../utils/getPillarTheme"
import { habitSuggestions, HabitSuggestion } from "../utils/habitSuggestions"

interface HabitPillarContainerProps {
    category: HabitCategory
    date: Date
}

export default function HabitPillarContainer({category, date}: HabitPillarContainerProps) {
    const { currentHabits, setHabitError, habitLoading } = useHabitContext();
    const { IconComponent } = getPillarTheme(category);
    const pillarHabits = Array.from(currentHabits.values()).filter((habit) => habit.category === category);
    const [newHabitVisible, setNewHabitVisible] = useState(false)
    const [editHabitId, setEditHabitId] = useState<number | undefined>(undefined);
    const [deleteHabitId, setDeleteHabitId] = useState<number | undefined>(undefined);
    const [suggestion, setSuggestion] = useState<HabitSuggestion | undefined>(undefined);
    const starter = habitSuggestions[category];
    // While habits load, an empty list means "not known yet", not "none", so hold back the suggestion
    const showSuggestion = !habitLoading && pillarHabits.length === 0;

    const getNewHabitComponent = () => {
        if (editHabitId !== undefined) {
            return (
                <NewHabit
                    isVisible={editHabitId !== undefined}
                    onClose={() => setEditHabitId(undefined)}
                    category={category}
                    date={date}
                    habitId={editHabitId}
                />
            )
        } else {
            return (
                <NewHabit
                    isVisible={newHabitVisible}
                    onClose={() => {
                        setNewHabitVisible(false)
                        setSuggestion(undefined)
                    }}
                    category={category}
                    date={date}
                    {...(suggestion ? { suggestion } : {})}
                />
            )
        }
    }

    return (
        <View className="bg-white rounded-2xl px-5 py-4 border border-neutral-300 mb-4 w-11/12 self-center">
            {/* Adding lives in the header so an empty pillar collapses to one quiet line */}
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <IconComponent size={22} color="#7d756b" />
                    <Text className="text-lg font-bold text-neutral-800 ml-2 capitalize">{category}</Text>
                </View>
                <TouchableOpacity 
                    className="flex-row items-center px-3 py-1.5 rounded-full bg-primary-50"
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Add ${category} habit`}
                    onPress={() => {
                        setNewHabitVisible(true)
                        setHabitError("")
                    }}
                >
                    <Ionicons name="add" size={16} color="#4f6650" />
                    <Text className="text-primary-600 font-semibold ml-0.5">Add</Text>
                </TouchableOpacity>
            </View>
            
            {showSuggestion && (
                <TouchableOpacity
                    className="flex-row items-center justify-between mt-3 px-4 py-3 rounded-xl border border-dashed border-primary-300"
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={`Start with ${starter.name}, ${starter.duration}`}
                    onPress={() => {
                        setSuggestion(starter)
                        setNewHabitVisible(true)
                        setHabitError("")
                    }}
                >
                    <View className="flex-1">
                        <Text className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Try starting with</Text>
                        <Text className="text-base font-medium text-neutral-800 mt-0.5">
                            {starter.name} <Text className="text-neutral-500 font-normal">· {starter.duration}</Text>
                        </Text>
                    </View>
                    <Ionicons name="arrow-forward" size={18} color="#4f6650" />
                </TouchableOpacity>
            )}

            {pillarHabits.length > 0 && (
                <View className="mt-2">
                    {pillarHabits.map((habit, index) => (
                        <View key={habit.id} className={index > 0 ? "border-t border-neutral-300" : ""}>
                            <HabitCard 
                                habit={habit} 
                                setEditHabitId={setEditHabitId}
                                setDeleteHabitId={setDeleteHabitId}
                                showCategory={false}
                                nested
                            />
                        </View>
                    ))}
                </View>
            )}

            <View>
                {getNewHabitComponent()}
            </View>
            
            <ConfirmDeleteHabit
                isVisible={deleteHabitId !== undefined}
                onClose={() => setDeleteHabitId(undefined)}
                onConfirm={() => setDeleteHabitId(undefined)}
                habitId={deleteHabitId!}
                date={date}
            />
        </View>
    )
}