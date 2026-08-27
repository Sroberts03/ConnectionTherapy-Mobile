import { Text, View } from "react-native"
import HabitCard from "../../habits/components/HabitCard";
import { useHabitContext } from "../../habits/HabitContext";
import { useEffect } from "react";
import { router } from "expo-router";
import ViewOtherInfoButton from "./ViewOtherInfoButton";

export default function TopHabitsContainer() {
    const {todaysTopHabits, reloadTopHabits } = useHabitContext();

    useEffect(() => {
        reloadTopHabits()
    }, [])

    return (
        <View className="flex-1 mt-4">
            <ViewOtherInfoButton onPress={() => router.push("/(tabs)/Habits")} />
            <View className="gap-y-3">
                {todaysTopHabits.size > 0 ? (
                    Array.from(todaysTopHabits.values()).map((habit) => (
                        <HabitCard 
                            key={habit.id} 
                            habit={habit}
                        />
                    ))
                ) : (
                    <View className="bg-white rounded-2xl p-6 items-center justify-center border border-neutral-100 shadow-sm">
                        <Text className="text-neutral-400 font-medium text-center">No habits due today</Text>
                        <Text className="text-sm text-neutral-400 text-center mt-1">Start a new habit today to build momentum</Text>
                    </View>
                )}
            </View>
        </View>
    )
}