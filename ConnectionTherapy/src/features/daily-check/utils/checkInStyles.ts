import { WeekDay } from "../dailyCheck.types";

// Once a mood is picked the others step back, so the choice reads at a glance
export function getMoodOptionStyle(isSelected: boolean, hasSelection: boolean) {
    return {
        container: isSelected ? "bg-primary-100 border-primary-500" : "bg-white border-neutral-300",
        emoji: hasSelection && !isSelected ? "opacity-50" : "",
        label: isSelected ? "font-semibold text-primary-700" : "text-neutral-600",
    };
}

export function getWeekDayStyle(day: Pick<WeekDay, "isToday" | "isFuture">) {
    return {
        letter: day.isToday ? "font-bold text-primary-700" : "text-neutral-500",
        ring: day.isToday ? "border border-primary-300" : "",
        dot: day.isFuture ? "bg-neutral-200" : "bg-neutral-300",
    };
}

export function getSaveButtonStyle(canSave: boolean) {
    return {
        button: canSave ? "bg-primary-600" : "bg-neutral-300",
        text: canSave ? "text-white" : "text-neutral-500",
    };
}
