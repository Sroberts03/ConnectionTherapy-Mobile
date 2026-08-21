export function parseRepeatString(repeatString: string): string {
    const repeatOptions: Map<string, string> = new Map([
        ["None", "None"],
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