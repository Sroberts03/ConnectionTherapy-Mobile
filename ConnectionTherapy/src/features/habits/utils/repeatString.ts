export type DayOption = { value: string; label: string };

interface FreqTypes {
    freqDaily: (interval: number) => string,
    freqWeekly: (interval: number, byDay: string[]) => string,
    freqMonthly: (
        interval: number,
        byDay?: string[],
        byMonthDay?: number[],
        dayOfMonthInterval?: "1" | "2" | "3" | "4" | "5" | "-1" | "",
        dayOfMonthIntervalOption?: DayOption[],
        daysOfWeek?: DayOption[]
    ) => string,
    freqYearly: (interval: number) => string
}

export function repeatString (
    freqHandlers: FreqTypes,
    interval: number,
    freq: string,
    byDay: string[],
    byMonthDay: number[],
    dayOfMonthInterval: "1" | "2" | "3" | "4" | "5" | "-1" | "",
    dayOfMonthIntervalOption?: DayOption[],
    daysOfWeek?: DayOption[]
): string {
    const freqRouter: Map<string, Function> = new Map([
        ["DAILY", freqHandlers.freqDaily],
        ["WEEKLY", freqHandlers.freqWeekly],
        ["MONTHLY", freqHandlers.freqMonthly],
        ["YEARLY", freqHandlers.freqYearly]
    ]);
    const handler = freqRouter.get(freq);
    return handler
        ? handler(interval, byDay, byMonthDay, dayOfMonthInterval, dayOfMonthIntervalOption, daysOfWeek)
        : "Unknown frequency";
}
