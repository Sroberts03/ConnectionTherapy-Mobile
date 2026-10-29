type HabitCardStyle = {
    iconColor: string;
    nameClassName: string;
    descriptionClassName: string;
    categoryBackgroundColor: string;
    categoryOpacity: number;
    categoryTextColor: string;
    categoryTextClassName: string;
    durationClassName: string;
    checkIconName: "checkmark-circle" | "ellipse-outline";
    checkIconColor: string;
};

// A finished habit stays in its pillar colour and reads as done, not cancelled
export function getHabitCardStyle(isCompleted: boolean, color: string): HabitCardStyle {
    if (isCompleted) {
        return {
            iconColor: color,
            nameClassName: "text-lg font-semibold text-neutral-600",
            descriptionClassName: "text-xs font-semibold text-neutral-500",
            categoryBackgroundColor: color,
            categoryOpacity: 0.15,
            categoryTextColor: color,
            categoryTextClassName: "text-[10px] font-semibold capitalize",
            durationClassName: "text-xs font-semibold",
            checkIconName: "checkmark-circle",
            checkIconColor: color,
        };
    }

    return {
        iconColor: color,
        nameClassName: "text-lg font-semibold text-neutral-900",
        descriptionClassName: "text-xs font-semibold text-neutral-700",
        categoryBackgroundColor: color,
        categoryOpacity: 0.15,
        categoryTextColor: color,
        categoryTextClassName: "text-[10px] font-semibold capitalize",
        durationClassName: "text-xs text-neutral-800",
        checkIconName: "ellipse-outline",
        checkIconColor: color,
    };
}

// A description that only repeats the name adds nothing to the card
export function shouldShowDescription(name: string, description: string | null): boolean {
    if (!description) return false;
    return description.trim().toLowerCase() !== name.trim().toLowerCase();
}
