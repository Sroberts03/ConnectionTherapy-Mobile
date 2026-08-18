import { SQLiteDatabase } from "expo-sqlite";
import { Habit, HabitCategory } from "../habits.types";
import { RRule, rrulestr } from 'rrule'
import { createHabitInstanceDataAccess, createNewHabitDataAccess, getHabitsDataAccess, markHabitCompleteDataAccess, markHabitIncompleteDataAccess } from "./habits.dataAccess";
import { CreationError } from "../errors/CreationError";

export async function getHabits(
    date: Date,
    userId: string,
    db: SQLiteDatabase
): Promise<Habit[]> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const habits: Habit[] = await getHabitsDataAccess(formattedDate, userId, db);
    return habits;
}

export async function toggleComplete(
    habitId: number,
    isComplete: boolean,
    db: SQLiteDatabase
): Promise<void> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    if (isComplete) {
        await markHabitCompleteDataAccess(habitId, formattedDate, db);
    } else {
        await markHabitIncompleteDataAccess(habitId, formattedDate, db);
    }
}

export async function createNewHabit (
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    repetition: string,
    endDate: string,
    description: string,
    userId: string,
    db: SQLiteDatabase,
): Promise<Habit | null> {
    if (name.trim() === "") {
        throw new CreationError("Habit name cannot be empty", "name");
    }
    if (!duration || duration.trim() === "") {
        throw new CreationError("Habit duration cannot be empty", "duration");
    }
    if (!startDate || startDate.trim() === "") {
        throw new CreationError("Habit start date cannot be empty", "startDate");
    }
    if (!category) {
        throw new CreationError("Habit category cannot be empty", "category");
    }
    if (endDate && endDate < startDate) {
        throw new CreationError("Habit end date cannot be before start date", "endDate");
    }
    
    let occurenceDates: Date[] = [];
    const start = new Date(`${startDate}T00:00:00`);
    const twoWeeksOut = new Date(start);
    twoWeeksOut.setDate(twoWeeksOut.getDate() + 14);
    
    let boundaryEnd = twoWeeksOut;
    if (endDate) {
        const providedEnd = new Date(`${endDate}T23:59:59`);
        boundaryEnd = providedEnd < twoWeeksOut ? providedEnd : twoWeeksOut;
    }

    if (repetition === "None" || !repetition) {
        occurenceDates = [start]
    } else {
        const parsedRule = rrulestr(repetition);
        const ruleWithStart = new RRule({
            ...parsedRule.options,
            dtstart: start,
        })
        occurenceDates = ruleWithStart.between(start, boundaryEnd, true)
    }

    const habitId: number = await createNewHabitDataAccess(
        name,
        duration,
        category,
        startDate,
        repetition,
        endDate,
        description,
        userId,
        db
    )

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayDay = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${todayYear}-${todayMonth}-${todayDay}`;

    let returnInstance: Habit | null = null;
    for (const date of occurenceDates) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const instance = await createHabitInstanceDataAccess(formattedDate, formattedToday, habitId, db);
        if (instance) {
            returnInstance = instance;
        }
    }
    return returnInstance;
}