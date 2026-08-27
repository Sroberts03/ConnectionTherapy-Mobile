import { Text, View, TouchableOpacity } from "react-native"
import { HabitCategory } from "../habits.types"
import HabitCard from "./HabitCard"
import { Ionicons } from "@expo/vector-icons"
import NewHabit from "./new-habit/NewHabit"
import { useState } from "react"
import ConfirmDeleteHabit from "./ConfirmDeleteHabit"
import { useHabitContext } from "../HabitContext"
import { getPillarTheme } from "../utils/getPillarTheme"

interface HabitPillarContainerProps {
    category: HabitCategory
    date: Date
}

export default function HabitPillarContainer({category, date}: HabitPillarContainerProps) {
    const { currentHabits, setHabitError } = useHabitContext();
    const { IconComponent } = getPillarTheme(category);
    const [newHabitVisible, setNewHabitVisible] = useState(false)
    const [editHabitId, setEditHabitId] = useState<number | undefined>(undefined);
    const [deleteHabitId, setDeleteHabitId] = useState<number | undefined>(undefined);

    return (
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 mb-4 w-11/12 self-center">
            <View className="flex-row items-center mb-4">
                <IconComponent size={24} color="#a4a4a4ff" />
                <Text className="text-lg font-bold text-neutral-800 ml-2 capitalize">{category}</Text>
            </View>
            
            <View className="gap-y-3">
                {Array.from(currentHabits.values()).filter((habit) => habit.category === category).length === 0 && (
                    <View className="rounded-xl p-5 items-center justify-center">
                        <View className="p-3 mb-3">
                            <IconComponent size={24} color="#a4a4a4ff" />
                        </View>
                        <Text className="text-neutral-400 font-medium ml-1">No habits yet</Text>
                        <Text className="text-sm text-neutral-400 ml-1">Start small to build consistency</Text>
                    </View>
                )}
                {Array.from(currentHabits.values()).filter((habit) => habit.category === category).map((habit) => (
                    <HabitCard 
                        key={habit.id} 
                        habit={habit} 
                        setEditHabitId={setEditHabitId}
                        setDeleteHabitId={setDeleteHabitId}
                    />
                ))}
            </View>

            <TouchableOpacity 
                className="flex-row items-center mt-5 ml-1" 
                onPress={() => {
                    setNewHabitVisible(true)
                    setHabitError("")
                }}
            >
                <Ionicons name="add" size={16} color="#9ca3af" />
                <Text className="text-neutral-400 font-medium ml-1">Add habit</Text>
            </TouchableOpacity>

            <NewHabit 
                isVisible={newHabitVisible}
                onClose={() => setNewHabitVisible(false)}
                category={category}
                date={date}
            />
            <NewHabit
                isVisible={editHabitId != undefined}
                onClose={() => setEditHabitId(undefined)}
                category={category}
                date={date}
            />
            <ConfirmDeleteHabit
                isVisible={deleteHabitId != undefined}
                onClose={() => setDeleteHabitId(undefined)}
                onConfirm={() => setDeleteHabitId(undefined)}
                habitId={deleteHabitId!}
                date={date}
            />
        </View>
    )
}