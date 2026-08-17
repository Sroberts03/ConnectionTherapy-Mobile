export default function CreateRepeatString(
    freq: string,
    interval: number,
    byDay?: string[],
    byMonthDay?: number[],
    dayOfMonthInterval?: "1" | "2" | "3" | "4" | "5" | "-1" | ""
) {
    let repetitionString = "";

    switch (freq) {
        case "DAILY":
            repetitionString = `FREQ=DAILY`;
            break;
        case "WEEKLY":
            repetitionString = `FREQ=WEEKLY`;
            if (byDay !== undefined && byDay.length > 0) {
                repetitionString += `;BYDAY=${byDay.join(",")}`;
            }
            break;
        case "MONTHLY":
            repetitionString = `FREQ=MONTHLY`;
            if (byMonthDay !== undefined && byMonthDay.length > 0) {
                repetitionString += `;BYMONTHDAY=${byMonthDay.join(",")}`;
            }
            // If they want specific days of the week in a month (e.g. First Mon & Wed)
            if (byDay !== undefined && byDay.length > 0 && dayOfMonthInterval) {
                const prefixedDays = byDay.map(day => `${dayOfMonthInterval}${day}`);
                repetitionString += `;BYDAY=${prefixedDays.join(",")}`;
            }
            break;
        case "YEARLY":
            repetitionString = `FREQ=YEARLY`;
            break;
        default:
            break;
    }

    if (interval !== 1) {
        repetitionString += `;INTERVAL=${interval}`;
    }

    return repetitionString;
}
