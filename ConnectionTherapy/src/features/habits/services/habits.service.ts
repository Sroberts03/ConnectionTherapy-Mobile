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
    maxHabits: "all" | number = "all"
): Promise<Habit[]> {
    const formattedDate = formatDate(date);
    return getHabitsDataAccess(formattedDate, userId, maxHabits);
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
    message: string = "You can not update this habit",
): Promise<void> {
    const isAllowedToUpdate = await userOwnsHabitDataAccess(habitInstanceId, userId);
    if (!isAllowedToUpdate) {
        throw new Error(message);
    }
}

export async function toggleComplete(
    habitId: number,
    isComplete: boolean,
): Promise<void> {
    const formattedDate = getToday();
    if (isComplete) {
        await markHabitCompleteDataAccess(habitId, formattedDate);
    } else {
        await markHabitIncompleteDataAccess(habitId, formattedDate);
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
    );

    return createInstances(req.userCurrentDate, occurenceDates, habitId);
}

export async function updateHabit(
    req: newHabitInput
): Promise<Habit | null> {
    if (!req.habitInstanceId) {
        throw new Error("Habit instance ID is required for updating a habit");
    }
    const occurenceDates = validateHabitInput(req.name, req.duration, req.category, req.startDate, req.endDate, req.repetition);

    await assertUserOwnsHabit(req.habitInstanceId, req.userId);

    const habitId = await getHabitIdFromInstanceIdDataAccess(req.habitInstanceId);

    await updateHabitDataAccess(
        habitId,
        req.name,
        req.duration,
        req.category,
        req.startDate,
        req.repetition,
        req.endDate,
        req.description,
    );
    await deleteHabitInstancesDataAccess(habitId, getToday());

    return createInstances(req.userCurrentDate, occurenceDates, habitId);
}

export async function getHabitDetails(
    habitId: number,
    userId: string,
): Promise<HabitDetails> {
    const userCanGetHabit = await userOwnsHabitDataAccess(habitId, userId);
    if (!userCanGetHabit) {
        throw new Error("User does not own this habit");
    }
    const habit = await getHabitDetailsDataAccess(habitId);
    if (!habit) {
        throw new Error("Habit not found");
    }
    return habit;
}

async function createInstances(
    userCurrentDate: string,
    occurenceDates: Date[], 
    habitId: number, 
): Promise<Habit | null> {
    let returnInstance: Habit | null = null;
    for (const date of occurenceDates) {
        const instance = await createHabitInstanceDataAccess(formatDate(date), habitId);
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
) {
    await assertUserOwnsHabit(habitInstanceId, userId, "You can not delete this habit");

    if (type === "single") {
        await deleteHabitInstanceDataAccess(habitInstanceId);
    } else if (type === "future") {
        const habitId = await getHabitIdFromInstanceIdDataAccess(habitInstanceId);
        await deleteHabitInstancesDataAccess(habitId, userCurrentDate);
        await markHabitInactiveDataAccess(habitId);
    }
}