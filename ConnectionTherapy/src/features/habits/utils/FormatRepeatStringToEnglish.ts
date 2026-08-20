export function formatRepeatStringToEnglish(
    interval: number,
    freq: string,
    byDay: string[],
    byMonthDay: number[],
    dayOfMonthInterval: "1" | "2" | "3" | "4" | "5" | "-1" | "",
    dayOfMonthIntervalOption: any[],
    daysOfWeek: any[]
): string {
    let repetitionString: string;
    switch (freq) {
        case "DAILY":
            repetitionString = freqDaily(interval);
            break;
        case "WEEKLY":
            repetitionString = freqWeekly(interval, byDay);
            break;
        case "MONTHLY":
            repetitionString = freqMonthly(interval, byDay, byMonthDay, dayOfMonthInterval, dayOfMonthIntervalOption, daysOfWeek);
            break;
        case "YEARLY":
            repetitionString = freqYearly(interval);
            break;
        default:
            repetitionString = "Unknown frequency";
    }
    return repetitionString;
}

function freqDaily(interval: number): string {
    return `Habit will occur every ${interval} ${interval === 1 ? 'day' : 'days'}`;
}

function freqWeekly(interval: number, byDay: string[]): string {
    let repetitionString = `Habit will occur every ${interval} ${interval === 1 ? 'week' : 'weeks'}`;
    if (byDay.length > 0) {
        if (byDay.length === 1) {
            repetitionString += ` on ${byDay[0]}`
        } else {
            repetitionString += ` on ${byDay.join(", ")}`
        }
    }
    return repetitionString;
}

function freqMonthly(
    interval: number, 
    byDay: string[], 
    byMonthDay: number[], 
    dayOfMonthInterval: "1" | "2" | "3" | "4" | "5" | "-1" | "", 
    dayOfMonthIntervalOption: any[], daysOfWeek: any[]
): string {
    let repetitionString = `Habit will occur every ${interval} ${interval === 1 ? 'month' : 'months'}`;
    if (byDay.length > 0) {
        if (byDay.length === 1) {
            repetitionString += ` on the ${dayOfMonthIntervalOption.find(o => o.value === dayOfMonthInterval)?.label.toLowerCase()} ${daysOfWeek.find(o => o.value === byDay[0])?.label.toLowerCase()}`
        }
    }
    if (byMonthDay.length > 0) {
        if (byMonthDay.length === 1) {
            repetitionString += ` on the ${byMonthDay[0]}`
        } else {
            repetitionString += ` on the ${byMonthDay.join(", ")}`
        }
    }
    return repetitionString;
}

function freqYearly(interval: number): string {
    let repetitionString = `Habit will occur every ${interval} ${interval === 1 ? 'year' : 'years'}`;
    return repetitionString;
}