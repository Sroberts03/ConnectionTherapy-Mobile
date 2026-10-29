import { getMoodOptionStyle, getSaveButtonStyle, getWeekDayStyle } from "../../../../src/features/daily-check/utils/checkInStyles";
import { WeekDay } from "../../../../src/features/daily-check/dailyCheck.types";

const day = (overrides: Partial<WeekDay>): WeekDay => ({ date: "2026-10-29", letter: "T", mood: null, isToday: false, isFuture: false, ...overrides });

describe("getMoodOptionStyle", () => {
    it("highlights the picked mood", () => {
        const style = getMoodOptionStyle(true, true);
        expect(style.container).toContain("primary");
        expect(style.emoji).toBe("");
    });

    it("dims the others once one is picked", () => {
        expect(getMoodOptionStyle(false, true).emoji).toBe("opacity-50");
    });

    it("leaves every mood bright before anything is picked", () => {
        expect(getMoodOptionStyle(false, false).emoji).toBe("");
    });
});

describe("getWeekDayStyle", () => {
    it("rings today", () => {
        expect(getWeekDayStyle(day({ isToday: true })).ring).toContain("border");
        expect(getWeekDayStyle(day({})).ring).toBe("");
    });

    it("fades days still to come", () => {
        expect(getWeekDayStyle(day({ isFuture: true })).dot).toBe("bg-neutral-200");
        expect(getWeekDayStyle(day({})).dot).toBe("bg-neutral-300");
    });
});

describe("getSaveButtonStyle", () => {
    it("greys out until there's something to save", () => {
        expect(getSaveButtonStyle(false).button).toBe("bg-neutral-300");
        expect(getSaveButtonStyle(true).button).toBe("bg-primary-600");
    });
});
