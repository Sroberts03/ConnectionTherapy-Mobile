import { repeatString } from "./repeatString";

export default function CreateRepeatString(
    freq: string,
    interval: number,
    byDay: string[],
    byMonthDay: number[],
    dayOfMonthInterval: "1" | "2" | "3" | "4" | "5" | "-1" | ""
) {
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
            dayOfMonthInterval
        );
}

function freqDaily(interval: number): string {
    return addInterval('FREQ=DAILY', interval);
}

function freqWeekly(
    interval: number,
    byDay?: string[]
): string {
    let repetitionString = `FREQ=WEEKLY`;
    if (byDay !== undefined && byDay.length > 0) {
        repetitionString += `;BYDAY=${byDay.join(",")}`;
    }
    return addInterval(repetitionString, interval);
}

function freqMonthly(
    interval: number,
    byDay?: string[],
    byMonthDay?: number[],
    dayOfMonthInterval?: "1" | "2" | "3" | "4" | "5" | "-1" | "",
): string {
    let repetitionString = `FREQ=MONTHLY`;
    repetitionString = monthlyByMonthDay(repetitionString, byMonthDay);
    repetitionString = monthlyByDay(repetitionString, byDay, dayOfMonthInterval);
    return addInterval(repetitionString, interval);
}


function freqYearly(interval: number): string {
    return addInterval('FREQ=YEARLY', interval);
}

function addInterval(repetitionString: string, interval: number): string {
    if (interval > 1) {
        repetitionString += `;INTERVAL=${interval}`;
    }
    return repetitionString;
}

function monthlyByDay(
    repetitionString: string,
    byDay?: string[], 
    dayOfMonthInterval?: "1" | "2" | "3" | "4" | "5" | "-1" | "") {
    if (byDay !== undefined && byDay.length > 0 && dayOfMonthInterval) {
        const prefixedDays = byDay.map(day => `${dayOfMonthInterval}${day}`);
        repetitionString += `;BYDAY=${prefixedDays.join(",")}`;
    }
    return repetitionString;
}

function monthlyByMonthDay(repetitionString: string, byMonthDay?: number[]): string {
    if (byMonthDay !== undefined && byMonthDay.length > 0) {
        repetitionString += `;BYMONTHDAY=${byMonthDay.join(",")}`;
    }
    return repetitionString;
}
