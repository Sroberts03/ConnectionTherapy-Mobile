export const repeatOptions = [
        {label: "None", value: "None"},
        {label: "Daily", value: "FREQ=DAILY"},
        {label: "Weekdays", value: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"},
        {label: "Weekends", value: "FREQ=WEEKLY;BYDAY=SA,SU"},
        {label: "Weekly", value: "FREQ=WEEKLY"},
        {label: "Bi-Weekly", value: "FREQ=WEEKLY;INTERVAL=2"},
        {label: "Monthly", value: "FREQ=MONTHLY"},
        {label: "Every 3 months", value: "FREQ=MONTHLY;INTERVAL=3"},
        {label: "Every 6 months", value: "FREQ=MONTHLY;INTERVAL=6"},
        {label: "Yearly", value: "FREQ=YEARLY"},
        {label: "Custom", value: "custom"}
]

export function getRepeatLabel(repetition: string): string {
    return repeatOptions.find(o => o.value === repetition)?.label ?? "Custom";
}