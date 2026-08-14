import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { getHabits } from "../services/habits.service";
import { useSQLiteContext } from "expo-sqlite";
import { Habit } from "../habits.types";
import ErrorLoading from "../../../globalComponents/ErrorLoading";
import HabitArea from "../components/HabitArea";
import DatePicker from "../components/DatePicker";
import TakeItOneWeekDialog from "../components/TakeItOneWeekDialog";

export default function HabitsScreen() {
    const db = useSQLiteContext();
    const [habits, setHabits] = useState<Map<number, Habit>>(new Map)
    const [date, setDate] = useState(new Date())
    const [habitLoading, setHabitLoading] = useState(false)
    const [habitError, setHabitError] = useState<string>("")
    const [showTakeItOneWeekDialog, setShowTakeItOneWeekDialog] = useState(false)

    useEffect(() => {
        setShowTakeItOneWeekDialog(takeItOneWeekAtATime())
        if (!showTakeItOneWeekDialog) {
            fetchHabits()
        }
    }, [date])

    const takeItOneWeekAtATime = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        // Get the Sunday of the current week (for today)
        const todaySunday = new Date(today);
        todaySunday.setDate(today.getDate() - today.getDay());

        // Get the Sunday of the selected week
        const selectedSunday = new Date(selectedDate);
        selectedSunday.setDate(selectedDate.getDate() - selectedDate.getDay());

        // Calculate the difference in milliseconds
        const diffMs = Math.abs(todaySunday.getTime() - selectedSunday.getTime());
        const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
        
        // Return true (block) if the difference is more than 1 week
        return Math.round(diffMs / oneWeekMs) > 1;
    }

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

    return (
        <ScrollView className="flex-1 bg-primary-50">
            <DatePicker
                date={date}
                setDate={setDate}
            />
            {showTakeItOneWeekDialog ?
                <TakeItOneWeekDialog /> :
                <View>
                    <ErrorLoading error={habitError} loading={habitLoading} />
                    <HabitArea
                        habits={habits}
                    />
                </View>
            }
        </ScrollView>
    );
}