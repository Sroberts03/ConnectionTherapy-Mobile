import { useEffect, useState } from "react";
import { useHabitContext } from "../HabitContext";
import { Habit } from "../habits.types";

export function useHabitCompletion(habit: Habit) {
    const { toggleHabitComplete, setHabitError } = useHabitContext();
    const [isCompleted, setIsCompleted] = useState(habit.isCompleted);

    useEffect(() => {
        setIsCompleted(habit.isCompleted);
    }, [habit.isCompleted]);

    return { isCompleted, toggleHabitComplete, setHabitError };
}