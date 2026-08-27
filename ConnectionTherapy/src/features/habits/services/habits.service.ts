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
    markHabitInactiveDataAccess, 
    markHabitIncompleteDataAccess, 
    updateHabitDataAccess, 
    userOwnsHabitDataAccess 
} from "./habits.dataAccess";
import getDates from "../utils/getDates";
import creationValidation from "../utils/habitValidation";
import { formatDate, getToday } from "../../../utils/dates";
import { newHabitInput } from "../habit.dto";

export async function getHabits(
    date: Date,
    userId: string,
    db: SQLiteDatabase,
    maxHabits: "all" | number = "all"
): Promise<Habit[]> {
    const formattedDate = formatDate(date);
    return getHabitsDataAccess(formattedDate, userId, db, maxHabits);
}

function validateHabitInput(
    name: string,
    duration: string,
    category: HabitCategory,
    startDate: string,
    endDate: string,
    repetition: string,
): Date[] {
    creationValidation(name, duration, category, startDate, endDate);
    return getDates(startDate, endDate, repetition);
}

async function assertUserOwnsHabit(
    habitInstanceId: number,
    userId: string,
    db: SQLiteDatabase,
    message: string = "You can not update this habit",
): Promise<void> {
    const isAllowedToUpdate = await userOwnsHabitDataAccess(habitInstanceId, userId, db);
    if (!isAllowedToUpdate) {
        throw new Error(message);
    }
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
    req: newHabitInput
): Promise<Habit | null> {
    const occurenceDates = validateHabitInput(req.name, req.duration, req.category, req.startDate, req.endDate, req.repetition);

    const habitId: number = await createNewHabitDataAccess(
        req.name,
        req.duration,
        req.category,
        req.startDate,
        req.repetition,
        req.endDate,
        req.description,
        req.userId,
        req.db
    );

    return createInstances(req.userCurrentDate, occurenceDates, habitId, req.db);
}

export async function updateHabit(
    req: newHabitInput
): Promise<Habit | null> {
    if (!req.habitInstanceId) {
        throw new Error("Habit instance ID is required for updating a habit");
    }
    const occurenceDates = validateHabitInput(req.name, req.duration, req.category, req.startDate, req.endDate, req.repetition);

    await assertUserOwnsHabit(req.habitInstanceId, req.userId, req.db);

    const habitId = await getHabitIdFromInstanceIdDataAccess(req.habitInstanceId, req.db);

    await updateHabitDataAccess(
        habitId,
        req.name,
        req.duration,
        req.category,
        req.startDate,
        req.repetition,
        req.endDate,
        req.description,
        req.db
    );
    await deleteHabitInstancesDataAccess(habitId, getToday(), req.db);

    return createInstances(req.userCurrentDate, occurenceDates, habitId, req.db);
}

export async function getHabitDetails(
    habitId: number,
    userId: string,
    db: SQLiteDatabase
): Promise<HabitDetails> {
    const userCanGetHabit = await userOwnsHabitDataAccess(habitId, userId, db);
    if (!userCanGetHabit) {
        throw new Error("User does not own this habit");
    }
    const habit = await getHabitDetailsDataAccess(habitId, db);
    if (!habit) {
        throw new Error("Habit not found");
    }
    return habit;
}

async function createInstances(
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
    await assertUserOwnsHabit(habitInstanceId, userId, db, "You can not delete this habit");

    if (type === "single") {
        await deleteHabitInstanceDataAccess(habitInstanceId, db);
    } else if (type === "future") {
        const habitId = await getHabitIdFromInstanceIdDataAccess(habitInstanceId, db);
        await deleteHabitInstancesDataAccess(habitId, userCurrentDate, db);
        await markHabitInactiveDataAccess(habitId, db);
    }
}