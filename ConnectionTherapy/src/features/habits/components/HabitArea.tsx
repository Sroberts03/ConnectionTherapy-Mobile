import { Platform, Text, View } from "react-native"
import { Habit, HabitCategory } from "../habits.types"
import { useEffect, useState } from "react"
import HabitPillarContainer from "./HabitPillarContainer"

interface HabitAreaProps {
    date: Date
    setError: (error: string) => void
}

export default function HabitArea({ date, setError}: HabitAreaProps) {
    const pillars = [HabitCategory.SPIRITUAL, HabitCategory.PHYSICAL, HabitCategory.SOCIAL, HabitCategory.INTELLECTUAL]
    
    return (
        <View className={Platform.OS === 'ios' ? "mb-24 mt-4" : "mb-4 mt-4"}>
            {pillars.map((pillar) => {
                return (
                    <HabitPillarContainer
                        key={pillar}
                        category={pillar}
                        date={date}
                    />
                )
            })}
        </View>
    )
}