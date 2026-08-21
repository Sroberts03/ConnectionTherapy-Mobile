import { getHabitCardStyle } from "../../../../src/features/habits/utils/getHabitCardStyle";

describe("getHabitCardStyle", () => {
    it("returns the correct style for a completed habit", () => {
        const style = getHabitCardStyle(true, "blue");
        expect(style).toEqual({
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
        });
    });

    it("returns the correct style for an incomplete habit", () => {
        const style = getHabitCardStyle(false, "blue");
        expect(style).toEqual({
            iconColor: "blue",
            nameClassName: "text-lg font-semibold text-black",
            descriptionClassName: "text-xs font-semibold text-neutral-700",
            categoryBackgroundColor: "blue",
            categoryOpacity: 0.15,
            categoryTextColor: "blue",
            categoryTextClassName: "text-[10px] font-semibold capitalize",
            durationClassName: "text-xs text-neutral-900",
            checkIconName: "ellipse-outline",
            checkIconColor: "blue",
        });
    });
});