import { SQLiteDatabase } from "expo-sqlite";
import { Habit, HabitCategory, HabitDetails } from "../habits.types";

import { 
    createHabitInstanceDataAccess, 
    createNewHabitDataAccess, 
    deleteHabitInstanceDataAccess, 
    deleteHabitInstancesDataAccess, 
    getHabitDetailsDataAccess, 
    getHabitIdFromInstanceIdDataAccess, 
    getHabitsDataAccess, 
    markHabitCompleteDataAccess, 
    markHabitIncompleteDataAccess, 
    updateHabitDataAccess, 
    userOwnsHabitDataAccess 
} from "./habits.dataAccess";
import getDates from "../utils/getDates";
import creationValidation from "../utils/habitValidation";
import { formatDate, getToday } from "../../../utils/dates";

export async function getHabits(
    date: Date,
    userId: string,
    db: SQLiteDatabase
): Promise<Habit[]> {
    const formattedDate = formatDate(date);
    const habits: Habit[] = await getHabitsDataAccess(formattedDate, userId, db);
    return habits;
}

export async function toggleComplete(
    habitId: number,
    isComplete: boolean,
    db: SQLiteDatabase
): Promise<void> {
    const formattedDate = getToday();
    if (isComplete) {
        await markHabitCompleteDataAccess(habitId, formattedDate, db);
    } else {
        await markHabitIncompleteDataAccess(habitId, formattedDate, db);
    }
}

export async function createNewHabit (
    userCurrentDate: string,
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
    creationValidation(name, duration, category, startDate, endDate);

    const occurenceDates = getDates(startDate, endDate, repetition);

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

    return createInstances(userCurrentDate, occurenceDates, habitId, db);
}

export async function updateHabit(
    userCurrentDate: string,
    habitInstanceId: number,
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
    creationValidation(name, duration, category, startDate, endDate)

    const occurenceDates = getDates(startDate, endDate, repetition);

    const isAllowedToUpdate = await userOwnsHabitDataAccess(habitInstanceId, userId, db)
    if (!isAllowedToUpdate) {
        throw new Error("You can not update this habit")
    }

    const habitId = await getHabitIdFromInstanceIdDataAccess(habitInstanceId, db)

    await updateHabitDataAccess(
        habitId,
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
    await deleteHabitInstancesDataAccess(habitId, getToday(), db)

    return createInstances(userCurrentDate, occurenceDates, habitId, db);
}

export async function getHabitDetails(
    habitId: number, 
    userId: string, 
    db: SQLiteDatabase
): Promise<HabitDetails> {
    const userCanGetHabit = await userOwnsHabitDataAccess(habitId, userId, db)
    if (!userCanGetHabit) {
        throw new Error("User does not own this habit")
    }
    const habit = await getHabitDetailsDataAccess(habitId, db);
    if (!habit) {
        throw new Error("Habit not found")
    }
    return habit;
}

export async function createInstances(
    userCurrentDate: string,
    occurenceDates: Date[], 
    habitId: number, 
    db: SQLiteDatabase
): Promise<Habit | null> {
    let returnInstance: Habit | null = null;
    for (const date of occurenceDates) {
        const instance = await createHabitInstanceDataAccess(formatDate(date), habitId, db);
        if (formatDate(date) === userCurrentDate) {
            returnInstance = instance;
        }
    }
    return returnInstance;
}

export async function deleteHabit(
    type: "future" | "single", 
    habitInstanceId: number, 
    userId: string,
    userCurrentDate: string,
    db: SQLiteDatabase
) {
    const isAllowedToUpdate = await userOwnsHabitDataAccess(habitInstanceId, userId, db)
    if (!isAllowedToUpdate) {
        throw new Error("You can not delete this habit")
    }
    if (type === "single") {
        await deleteHabitInstanceDataAccess(habitInstanceId, db)
    } else if (type === "future") {
        const habitId = await getHabitIdFromInstanceIdDataAccess(habitInstanceId, db)
        await deleteHabitInstancesDataAccess(habitId, userCurrentDate, db)
    }
}