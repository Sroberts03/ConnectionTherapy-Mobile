import { Platform, Text, View } from "react-native"
import { Habit, HabitCategory } from "../habits.types"
import { useEffect, useState } from "react"
import HabitPillarContainer from "./HabitPillarContainer"

interface HabitAreaProps {
    habits: Map<number, Habit>
}

export default function HabitArea({habits}: HabitAreaProps) {
    const pillars = [HabitCategory.SPIRITUAL, HabitCategory.PHYSICAL, HabitCategory.SOCIAL, HabitCategory.INTELLECTUAL]
    const [spiritualHabits, setSpiritualHabits] = useState<Map<number, Habit>>(new Map)
    const [physicalHabits, setPhysicalHabits] = useState<Map<number, Habit>>(new Map)
    const [intelectualHabits, setIntellectualHabits] = useState<Map<number, Habit>>(new Map)
    const [socialHabits, setSocialHabits] = useState<Map<number, Habit>>(new Map)

    useEffect(() => {
        const spiritualHabits = new Map<number, Habit>()
        const physicalHabits = new Map<number, Habit>()
        const intelectualHabits = new Map<number, Habit>()
        const socialHabits = new Map<number, Habit>()
        habits.forEach((habit) => {
            if (habit.category === "Spiritual") {
                spiritualHabits.set(habit.id, habit)
            }
            if (habit.category === "Physical") {
                physicalHabits.set(habit.id, habit)
            }
            if (habit.category === "Social") {
                socialHabits.set(habit.id, habit)
            }
            if (habit.category === "Intellectual") {
                intelectualHabits.set(habit.id, habit)
            }
        })
        setSpiritualHabits(spiritualHabits)
        setPhysicalHabits(physicalHabits)
        setIntellectualHabits(intelectualHabits)
        setSocialHabits(socialHabits)
    }, [habits])

    return (
        <View className={Platform.OS === 'ios' ? "mb-24 mt-4" : "mb-4 mt-4"}>
            {pillars.map((pillar) => {
                return (
                    <HabitPillarContainer
                        key={pillar}
                        category={pillar}
                        habits={
                            pillar === HabitCategory.SPIRITUAL ? spiritualHabits :
                            pillar === HabitCategory.PHYSICAL ? physicalHabits :
                            pillar === HabitCategory.SOCIAL ? socialHabits :
                            intelectualHabits}
                    />
                )
            })}
        </View>
    )
}