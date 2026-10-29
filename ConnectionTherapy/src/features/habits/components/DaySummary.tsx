import { Text, View } from "react-native"
import { useHabitContext } from "../HabitContext"
import { getDaySummary } from "../utils/getDaySummary"

interface DaySummaryProps {
    isToday: boolean
}

// A quiet read of the day above the pillars, so the screen opens on where you are, not just a list
export default function DaySummary({ isToday }: DaySummaryProps) {
    const { currentHabits } = useHabitContext()
    const habits = Array.from(currentHabits.values())
    const done = habits.filter((habit) => habit.isCompleted).length
    const { message, percentDone } = getDaySummary(done, habits.length, isToday)

    return (
        <View className="w-11/12 self-center mb-4 px-1">
            <Text className="text-base font-semibold text-neutral-800">{message}</Text>
            {percentDone !== null && (
                <View className="h-1.5 rounded-full bg-neutral-300 mt-2 overflow-hidden">
                    <View className="h-full rounded-full bg-primary-500" style={{ width: `${percentDone}%` }} />
                </View>
            )}
        </View>
    )
}
