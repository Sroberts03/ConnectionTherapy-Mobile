import { getHabitCardStyle } from "../../../../src/features/habits/utils/getHabitCardStyle";

describe("getHabitCardStyle", () => {
    it("returns the correct style for a completed habit", () => {
        const style = getHabitCardStyle(true, "blue");
        expect(style).toEqual({
            iconColor: "blue",
            nameClassName: "text-lg font-semibold text-neutral-600",
            descriptionClassName: "text-xs font-semibold text-neutral-500",
            categoryBackgroundColor: "blue",
            categoryOpacity: 0.15,
            categoryTextColor: "blue",
            categoryTextClassName: "text-[10px] font-semibold capitalize",
            durationClassName: "text-xs font-semibold",
            checkIconName: "checkmark-circle",
            checkIconColor: "blue",
        });
    });

    it("returns the correct style for an incomplete habit", () => {
        const style = getHabitCardStyle(false, "blue");
        expect(style).toEqual({
            iconColor: "blue",
            nameClassName: "text-lg font-semibold text-neutral-900",
            descriptionClassName: "text-xs font-semibold text-neutral-700",
            categoryBackgroundColor: "blue",
            categoryOpacity: 0.15,
            categoryTextColor: "blue",
            categoryTextClassName: "text-[10px] font-semibold capitalize",
            durationClassName: "text-xs text-neutral-800",
            checkIconName: "ellipse-outline",
            checkIconColor: "blue",
        });
    });
});