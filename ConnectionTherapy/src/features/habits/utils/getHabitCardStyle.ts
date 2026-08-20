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

export function getHabitCardStyle(isCompleted: boolean, color: string): HabitCardStyle {
    if (isCompleted) {
        return {
            iconColor: "#e0dcd4",
            nameClassName: "text-lg font-semibold text-neutral-400 line-through",
            descriptionClassName: "text-xs font-semibold text-neutral-400 line-through",
            categoryBackgroundColor: "#f5f5f5",
            categoryOpacity: 1,
            categoryTextColor: "#a3a3a3",
            categoryTextClassName: "text-[10px] font-semibold capitalize line-through",
            durationClassName: "text-xs text-neutral-300 line-through",
            checkIconName: "checkmark-circle",
            checkIconColor: "#14b850ff",
        };
    }

    return {
        iconColor: color,
        nameClassName: "text-lg font-semibold text-black",
        descriptionClassName: "text-xs font-semibold text-neutral-700",
        categoryBackgroundColor: color,
        categoryOpacity: 0.15,
        categoryTextColor: color,
        categoryTextClassName: "text-[10px] font-semibold capitalize",
        durationClassName: "text-xs text-neutral-900",
        checkIconName: "ellipse-outline",
        checkIconColor: color,
    };
}