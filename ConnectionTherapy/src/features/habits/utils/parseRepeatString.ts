export function parseRepeatString(repeatString: string): string {
    const repeatOptions: Map<string, string> = new Map([
        ["FREQ=DAILY", "Daily"],
        ["FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR", "Weekdays"],
        ["FREQ=WEEKLY;BYDAY=SA,SU", "Weekends"],
        ["FREQ=WEEKLY", "Weekly"],
        ["FREQ=WEEKLY;INTERVAL=2", "Bi-Weekly"],
        ["FREQ=MONTHLY", "Monthly"],
        ["FREQ=MONTHLY;INTERVAL=3", "Every 3 months"],
        ["FREQ=MONTHLY;INTERVAL=6", "Every 6 months"],
        ["FREQ=YEARLY", "Yearly"]
    ])

    return repeatOptions.get(repeatString) || "custom";
}

export function parseCustomFreq(repeatString: string): string {
    const frequencyRegex = /FREQ=([A-Z]+)/;
    const match = repeatString.match(frequencyRegex);
    return match ? match[1] : "DAILY";
}

export function parseCustomInterval(repeatString: string): number {
    const intervalRegex = /INTERVAL=(\d+)/;
    const match = repeatString.match(intervalRegex);
    return match ? parseInt(match[1]) : 1;
}

export function parseCustomByDay(repeatString: string): string[] {
    const byDayRegex = /BYDAY=([-]?[1-5]?[A-Z,]+)/; 
    const match = repeatString.match(byDayRegex);
    const byDayHasMonthInterval = match && match[1].length > 2
    if (byDayHasMonthInterval) {
        const dayWithoutMonthInterval = match[1].split(",").map((dayPart) => dayPart.substring(1))
        return dayWithoutMonthInterval
    }
    return match ? match[1].split(",") : [];
}

export function parseCustomDayOfMonthInterval(repeatString: string): "1" | "2" | "3" | "4" | "5" | "-1" | "" {
    const dayOfMonthIntervalRegex = /BYDAY=([-1,1,2,3,4,5])/;
    const match = repeatString.match(dayOfMonthIntervalRegex);
    return match ? match[1] as "1" | "2" | "3" | "4" | "5" | "-1" : "";
}

export function parseCustomByMonthDay(repeatString: string): number[] {
    const byMonthDayRegex = /BYMONTHDAY=(\d+(,\d+)*)/;
    const match = repeatString.match(byMonthDayRegex);
    return match ? match[1].split(",").map(Number) : [];
}

export function parseCustomEachOrOnThe(repeatString: string): "Each" | "On The..." {
    if (parseCustomByDay(repeatString).length > 0) {
        return "On The..."
    }
    if (parseCustomByMonthDay(repeatString).length > 0) {
        return "Each"
    }
    return "Each"
}
