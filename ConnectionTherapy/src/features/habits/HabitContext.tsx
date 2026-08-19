import { createContext, useContext, useState } from "react";
import { Habit } from "./habits.types";
import { useSQLiteContext } from "expo-sqlite";
import { useAuth } from "../auth/AuthContext";
import { getHabits, toggleComplete } from "./services/habits.service";
import { usePillarContext } from "../dashboard/PillarContext";

export interface habitContextType {
    todaysTopHabits: Map<number, Habit>
    setTodaysTopHabits: (todaysTopHabits: Map<number, Habit>) => void
    reloadTopHabits: () => void
    currentHabits: Map<number, Habit>
    setCurrentHabits: (currentHabits: Map<number, Habit>) => void
    reloadCurrentHabits: (date: Date) => void
    toggleHabitComplete: (id: number, isCompleted: boolean) => void;
    habitError: string
    setHabitError: (habitError: string) => void
    habitLoading: boolean
    setHabitLoading: (habitLoading: boolean) => void
}

export const DashboardContext = createContext<habitContextType | undefined>(undefined);

export function useHabitContext() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
}

export function HabitProvider({ children }: { children: React.ReactNode }) {
    const db = useSQLiteContext();
    const { user } = useAuth();
    const { reloadPillarPercentages } = usePillarContext()
    const [todaysTopHabits, setTodaysTopHabits] = useState(new Map<number, Habit>());
    const [currentHabits, setCurrentHabits] = useState(new Map<number, Habit>());
    const [habitError, setHabitError] = useState<string>("");
    const [habitLoading, setHabitLoading] = useState(false);

    const reloadTopHabits = async () => {
        if (!user) return;
        setHabitLoading(true);
        try {
            const habits: Habit[] = await getHabits(new Date(), user.id, db, 5);
            setTodaysTopHabits(new Map(habits.map(habit => [habit.id, habit])));
        } catch (error) {
            setHabitError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setHabitLoading(false);
        }
    }

    const reloadCurrentHabits = async (date: Date) => {
        if (!user) {
            return
        }
        setHabitLoading(true)
        try {
            const habits: Habit[] = await getHabits(date, user.id, db)
            setCurrentHabits(new Map(habits.map(habit => [habit.id, habit])))
        } catch (error) {
            setHabitError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setHabitLoading(false)
        }
    }

    const toggleHabitComplete = async (id: number, isCompleted: boolean) => {
        const targetState = !isCompleted;
        try {
            await toggleComplete(id, targetState, db);
            const habit = currentHabits.get(id);
            if (habit) {
                habit.isCompleted = targetState;
                setCurrentHabits(new Map(currentHabits.set(id, habit)));
            }
            if (todaysTopHabits.has(id)) {
                const topHabit = todaysTopHabits.get(id);
                if (topHabit) {
                    topHabit.isCompleted = targetState;
                    setTodaysTopHabits(new Map(todaysTopHabits.set(id, topHabit)));
                }
            }
            await reloadPillarPercentages()
        } catch (e) {
            setHabitError(e instanceof Error ? e.message : "Failed to toggle complete")
        }
    }

    return (
        <DashboardContext.Provider value={{
            todaysTopHabits,
            setTodaysTopHabits,
            reloadTopHabits,
            currentHabits,
            setCurrentHabits,
            reloadCurrentHabits,
            toggleHabitComplete,
            habitError,
            setHabitError,
            habitLoading,
            setHabitLoading
        }}>
            {children}
        </DashboardContext.Provider>
    );
}