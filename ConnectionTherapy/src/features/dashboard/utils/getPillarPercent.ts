import { Habit } from "../../habits/habits.types";

export function getPillarPercent(pillarHabits: Habit[], dayOfWeek: number): number {
    let dayWithOneComplete: Set<string> = new Set();
    if (noHabits(pillarHabits)) {
        return 0;
    } else if (isSunday(dayOfWeek)) {
        return 100;
    } else {
        pillarHabits.forEach((habit) => {
            if (habitComplete(habit)) {
                dayWithOneComplete.add(habit.completedOn);
            }
        })
    }
    const rawPercent = (dayWithOneComplete.size / (dayOfWeek + 1)) * 100
    return rawPercent % 1 === 0 ? rawPercent : Math.round(rawPercent);
}

function noHabits(pillarHabits: Habit[]) {
    return pillarHabits.length === 0;
}

function isSunday(dayOfWeek: number) {
    return dayOfWeek === 0;
}

function habitComplete(habit: Habit) {
    return habit.isCompleted;
}
