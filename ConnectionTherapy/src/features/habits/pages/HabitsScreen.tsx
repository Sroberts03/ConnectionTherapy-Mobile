import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getHabits } from "../services/habits.service";
import { useSQLiteContext } from "expo-sqlite";
import { Habit } from "../habits.types";
import ErrorLoading from "../../../globalComponents/ErrorLoading";
import HabitArea from "../components/HabitArea";
import DatePicker from "../components/DatePicker";

export default function HabitsScreen() {
    const db = useSQLiteContext();
    const [habits, setHabits] = useState<Map<number, Habit>>(new Map)
    const [date, setDate] = useState(new Date())
    const [habitLoading, setHabitLoading] = useState(false)
    const [habitError, setHabitError] = useState<string>("")

    useEffect(() => {
        const fetchHabits = async () => {
            setHabitLoading(true)
            setHabitError("")
            try {
                const habits: Habit[] = await getHabits(date, db)
                setHabits(new Map(habits.map(habit => [habit.id, habit])))
            } catch (error) {
                setHabitError(error instanceof Error ? error.message : "Unknown error")
            } finally {
                setHabitLoading(false)
            }
        }
        fetchHabits()
    }, [date])

    return (
        <ScrollView className="flex-1 bg-primary-50">
            <DatePicker 
                date={date}
                setDate={setDate}
            />
            <ErrorLoading error={habitError} loading={habitLoading} />
            <HabitArea
                habits={habits}
            />
        </ScrollView>
    );
}