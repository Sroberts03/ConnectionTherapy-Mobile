import { Text, View } from "react-native"
import { useHabitContext } from "../HabitContext"

interface DaySummaryProps {
    isToday: boolean
}

// A quiet read of the day above the pillars, so the screen opens on where you are, not just a list
export default function DaySummary({ isToday }: DaySummaryProps) {
    const { currentHabits } = useHabitContext()
    const habits = Array.from(currentHabits.values())
    const done = habits.filter((habit) => habit.isCompleted).length
    const total = habits.length
    const dayWord = isToday ? "today" : "this day"

    const message = total === 0
        ? `Nothing planned ${dayWord}. One small habit is a good start.`
        : done === total
            ? `All ${total} done ${dayWord}. Nicely done 🌱`
            : `${done} of ${total} done ${dayWord}`

    return (
        <View className="w-11/12 self-center mb-4 px-1">
            <Text className="text-base font-semibold text-neutral-800">{message}</Text>
            {total > 0 && (
                <View className="h-1.5 rounded-full bg-neutral-300 mt-2 overflow-hidden">
                    <View
                        className="h-full rounded-full bg-primary-500"
                        style={{ width: `${Math.round((done / total) * 100)}%` }}
                    />
                </View>
            )}
        </View>
    )
}
