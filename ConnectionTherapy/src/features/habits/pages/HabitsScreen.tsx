import { Platform, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { getHabits } from "../services/habits.service";
import { useSQLiteContext } from "expo-sqlite";
import { Habit } from "../habits.types";
import ErrorLoading from "../../../globalComponents/ErrorLoading";
import HabitArea from "../components/HabitArea";
import DatePicker from "../components/DatePicker";
import TakeItOneWeekDialog from "../components/TakeItOneWeekDialog";
import { useHabitContext } from "../HabitContext";

export default function HabitsScreen() {
    const {
        currentHabits,
        reloadCurrentHabits,
        habitError,
        setHabitError,
        habitLoading
    } = useHabitContext()
    const [date, setDate] = useState(new Date())
    const [showTakeItOneWeekDialog, setShowTakeItOneWeekDialog] = useState(false)

    useEffect(() => {
        const isOutsideRange = takeItOneWeekAtATime()
        setShowTakeItOneWeekDialog(isOutsideRange)
        if (!isOutsideRange) {
            reloadCurrentHabits(date)
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
    
    return (
        <ScrollView 
            className={`flex-1 bg-primary-50`}
            contentContainerStyle={{ paddingTop: Platform.OS === "ios" ? 40 : 48 }}
            showsVerticalScrollIndicator={false}
        >
            <DatePicker
                date={date}
                setDate={setDate}
            />
            {showTakeItOneWeekDialog ?
                <TakeItOneWeekDialog /> :
                <View>
                    <ErrorLoading error={habitError} loading={habitLoading} />
                    <HabitArea
                        date={date}
                        setError={setHabitError}
                    />
                </View>
            }
        </ScrollView>
    );
}