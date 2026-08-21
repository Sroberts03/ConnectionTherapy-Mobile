import { DayOption, repeatString } from "./repeatString";

export function formatRepeatStringToEnglish(
    interval: number,
    freq: string,
    byDay: string[],
    byMonthDay: number[],
    dayOfMonthInterval: "1" | "2" | "3" | "4" | "5" | "-1" | "",
    dayOfMonthIntervalOption: DayOption[],
    daysOfWeek: DayOption[]
): string {
    return repeatString(
        {
            freqDaily,
            freqWeekly,
            freqMonthly,
            freqYearly
        },
        interval,
        freq,
        byDay,
        byMonthDay,
        dayOfMonthInterval,
        dayOfMonthIntervalOption,
        daysOfWeek
    );
}

function freqDaily(interval: number): string {
    return `Habit will occur every ${interval} ${interval === 1 ? 'day' : 'days'}`;
}

function freqWeekly(interval: number, byDay: string[]): string {
    const unit = interval === 1 ? 'week' : 'weeks';
    const dayText = byDay.length > 0 ? ` on ${byDay.join(", ")}` : '';
    return `Habit will occur every ${interval} ${unit}${dayText}`;
}

function freqMonthly(
    interval: number,
    byDay?: string[],
    byMonthDay?: number[],
    dayOfMonthInterval?: "1" | "2" | "3" | "4" | "5" | "-1" | "",
    dayOfMonthIntervalOption?: DayOption[],
    daysOfWeek?: DayOption[]
): string {
    const unit = interval === 1 ? 'month' : 'months';
    let result = `Habit will occur every ${interval} ${unit}`;
    result = monthlyByDay(result, byDay, dayOfMonthInterval, dayOfMonthIntervalOption, daysOfWeek);
    result = monthlyByMonthDay(result, byMonthDay);
    return result;
}

function freqYearly(interval: number): string {
    return `Habit will occur every ${interval} ${interval === 1 ? 'year' : 'years'}`;
}

function monthlyByDay(
    result: string, 
    byDay?: string[], 
    dayOfMonthInterval?: "1" | "2" | "3" | "4" | "5" | "-1" | "", 
    dayOfMonthIntervalOption?: DayOption[], 
    daysOfWeek?: DayOption[]
): string {
    if (byDay && byDay.length > 0) {
        const ordinal = dayOfMonthIntervalOption?.find(o => o.value === dayOfMonthInterval)?.label.toLowerCase();
        const dayName = daysOfWeek?.find(o => o.value === byDay[0])?.label.toLowerCase();
        result += ` on the ${ordinal} ${dayName}`;
    }
    return result;
}

function monthlyByMonthDay(result: string, byMonthDay?: number[]): string {
    if (byMonthDay && byMonthDay.length > 0) {
        result += ` on the ${byMonthDay.join(", ")}`;
    }
    return result;
}