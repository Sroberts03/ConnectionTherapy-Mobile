import { addDays } from "@utils/dates";
import { DailyCheck, WeekDay } from "../dailyCheck.types";
import { getMood } from "./moods";

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

// Sunday to Saturday, each day carrying its check-in mood if there was one
export function getWeekStrip(startOfWeek: string, today: string, checks: DailyCheck[]): WeekDay[] {
    const moodByDate = new Map(checks.map(check => [check.date, check.mood]));
    return DAY_LETTERS.map((letter, index) => {
        const date = addDays(startOfWeek, index);
        return {
            date,
            letter,
            mood: getMood(moodByDate.get(date)),
            isToday: date === today,
            isFuture: date > today,
        };
    });
}
