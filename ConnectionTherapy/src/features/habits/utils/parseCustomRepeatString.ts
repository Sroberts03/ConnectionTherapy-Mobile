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
    if (byDayHasMonthInterval(match)) {
        const dayWithoutMonthInterval = getDayWithoutMonthInterval(match);
        return dayWithoutMonthInterval;
    }
    return match ? match[1].split(",") : [];
}

function byDayHasMonthInterval(match: RegExpMatchArray | null): boolean {
    if (!match) return false;
    const dayString = match[1];
    const dayList = dayString.split(",");
    return dayList[0].length > 2
}

function getDayWithoutMonthInterval(match: RegExpMatchArray | null): string[] {
    if (!match) return [];
    const dayString = match[1];
    if (dayString.length > 3) {
        return dayString.split(",").map((dayPart) => dayPart.substring(2)) || [];
    } else {
        return dayString.split(",").map((dayPart) => dayPart.substring(1)) || [];
    };    
}

export function parseCustomDayOfMonthInterval(repeatString: string): "1" | "2" | "3" | "4" | "5" | "-1" | "" {
    const dayOfMonthIntervalRegex = /BYDAY=([[-]?[1-5])/;
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
