import { Text, View, TouchableOpacity } from "react-native"
import { Habit, HabitCategory } from "../habits.types"
import HabitCard from "./HabitCard"
import { Ionicons } from "@expo/vector-icons"
import NewHabit from "./NewHabit"
import { useState } from "react"
import ConfirmDeleteHabit from "./ConfirmDeleteHabit"

interface HabitPillarContainerProps {
    habits: Map<number, Habit>
    setHabits: (habits: Map<number, Habit>) => void
    category: HabitCategory
    date: Date
    setError: (error: string) => void
}

export default function HabitPillarContainer({habits, category, setHabits, date, setError}: HabitPillarContainerProps) {
    const [newHabitVisible, setNewHabitVisible] = useState(false)
    const [editHabitId, setEditHabitId] = useState<number | undefined>(undefined);
    const [deleteHabitId, setDeleteHabitId] = useState<number | undefined>(undefined);

    const getIcon = () => {
        switch (category) {
            case HabitCategory.SPIRITUAL: return "leaf-outline"
            case HabitCategory.PHYSICAL: return "barbell-outline"
            case HabitCategory.SOCIAL: return "person-outline"
            case HabitCategory.INTELLECTUAL: return "book-outline"
            default: return "ellipse-outline"
        }
    }

    return (
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 mb-4 w-11/12 self-center">
            <View className="flex-row items-center mb-4">
                <Ionicons name={getIcon()} size={20} color="#0d9488" />
                <Text className="text-lg font-bold text-neutral-800 ml-2 capitalize">{category}</Text>
            </View>
            
            <View className="gap-y-3">
                {Array.from(habits.values()).length === 0 && (
                    <View className="rounded-xl p-5 items-center justify-center">
                        <View className="p-3 mb-3">
                            <Ionicons name={getIcon()} size={20} color="#a4a4a4ff" />
                        </View>
                        <Text className="text-neutral-400 font-medium ml-1">No habits yet</Text>
                        <Text className="text-sm text-neutral-400 ml-1">Start small to build consistency</Text>
                    </View>
                )}
                {Array.from(habits.values()).map((habit) => (
                    <HabitCard 
                        key={habit.id} 
                        habit={habit} 
                        setEditHabitId={setEditHabitId}
                        setDeleteHabitId={setDeleteHabitId}
                        setError={setError}
                    />
                ))}
            </View>

            <TouchableOpacity 
                className="flex-row items-center mt-5 ml-1" 
                onPress={() => {
                    setNewHabitVisible(true)
                    setError("")
                }}
            >
                <Ionicons name="add" size={16} color="#9ca3af" />
                <Text className="text-neutral-400 font-medium ml-1">Add habit</Text>
            </TouchableOpacity>

            <NewHabit 
                isVisible={newHabitVisible}
                onClose={() => setNewHabitVisible(false)}
                category={category}
                habits={habits}
                setHabits={setHabits}
                date={date}
                setError={setError}
            />
            <NewHabit
                isVisible={editHabitId != undefined}
                onClose={() => setEditHabitId(undefined)}
                category={category}
                habits={habits}
                setHabits={setHabits}
                date={date}
                habitId={editHabitId}
                setError={setError}
            />
            <ConfirmDeleteHabit
                isVisible={deleteHabitId != undefined}
                onClose={() => setDeleteHabitId(undefined)}
                onConfirm={() => setDeleteHabitId(undefined)}
                habitId={deleteHabitId}
                habits={habits}
                setHabits={setHabits}
                setError={setError}
                date={date}
            />
        </View>
    )
}