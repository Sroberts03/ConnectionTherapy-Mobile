import { addDays, parseDateString } from "@utils/dates";
import { DailyCheck, Mood } from "../dailyCheck.types";
import { getMood } from "./moods";

export interface CalendarDay {
    date: string;
    dayNumber: number;
    mood: Mood | null;
    isToday: boolean;
    isFuture: boolean;
}

export function getMonthStart(date: string): string {
    return `${date.slice(0, 7)}-01`;
}

export function shiftMonth(monthStart: string, months: number): string {
    const [year, month] = monthStart.split("-").map(Number);
    const shifted = new Date(year ?? 0, (month ?? 1) - 1 + months, 1);
    return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, "0")}-01`;
}

export function getMonthEnd(monthStart: string): string {
    return addDays(shiftMonth(monthStart, 1), -1);
}

export function formatMonthTitle(monthStart: string): string {
    return parseDateString(monthStart).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Rows of seven, Sunday first, with blanks before the 1st and after the last day
export function getMonthGrid(monthStart: string, today: string, checks: DailyCheck[]): (CalendarDay | null)[][] {
    const moodByDate = new Map(checks.map(check => [check.date, check.mood]));
    const daysInMonth = Number(getMonthEnd(monthStart).slice(8));
    const cells: (CalendarDay | null)[] = Array(parseDateString(monthStart).getDay()).fill(null);

    for (let index = 0; index < daysInMonth; index++) {
        const date = addDays(monthStart, index);
        cells.push({ date, dayNumber: index + 1, mood: getMood(moodByDate.get(date)), isToday: date === today, isFuture: date > today });
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: (CalendarDay | null)[][] = [];
    for (let start = 0; start < cells.length; start += 7) rows.push(cells.slice(start, start + 7));
    return rows;
}
