import { 
    parseCustomFreq, 
    parseCustomInterval, 
    parseCustomByDay, 
    parseCustomByMonthDay, 
    parseCustomDayOfMonthInterval, 
    parseCustomEachOrOnThe } from "../../../../src/features/habits/utils/parseCustomRepeatString";

describe("parseCustomRepeatString", () => {
    it("parse custom frequency", () => {
        expect(parseCustomFreq("FREQ=DAILY")).toBe("DAILY");
        expect(parseCustomFreq("FREQ=WEEKLY;BYDAY=MO,WE")).toBe("WEEKLY");
        expect(parseCustomFreq("FREQ=MONTHLY;BYMONTHDAY=1,15")).toBe("MONTHLY");
        expect(parseCustomFreq("FREQ=YEARLY")).toBe("YEARLY");
        expect(parseCustomFreq("")).toBe("DAILY");
    });

    it("parse custom interval", () => {
        expect(parseCustomInterval("FREQ=DAILY;INTERVAL=3")).toBe(3);
        expect(parseCustomInterval("FREQ=WEEKLY;BYDAY=MO,WE;INTERVAL=2")).toBe(2);
        expect(parseCustomInterval("FREQ=MONTHLY;BYMONTHDAY=1,15;INTERVAL=4")).toBe(4);
        expect(parseCustomInterval("FREQ=YEARLY;INTERVAL=5")).toBe(5);
        expect(parseCustomInterval("FREQ=DAILY")).toBe(1);
    });

    it("parse custom by day", () => {
        expect(parseCustomByDay("FREQ=WEEKLY;BYDAY=MO,WE")).toEqual(["MO", "WE"]);
        expect(parseCustomByDay("FREQ=MONTHLY;BYDAY=1MO")).toEqual(["MO"]);
        expect(parseCustomByDay("FREQ=MONTHLY")).toEqual([]);
        expect(parseCustomByDay("FREQ=MONTHLY;BYDAY=-1FR")).toEqual(["FR"]);
        expect(parseCustomByDay("FREQ=WEEKLY")).toEqual([]); 
    });

    it("parse custom by month day", () => {
        expect(parseCustomByMonthDay("FREQ=MONTHLY;BYMONTHDAY=1,15")).toEqual([1, 15]);
        expect(parseCustomByMonthDay("FREQ=MONTHLY")).toEqual([]);
    });

    it("parse custom day of month interval", () => {
        expect(parseCustomDayOfMonthInterval("FREQ=MONTHLY;BYDAY=1MO")).toBe("1");
        expect(parseCustomDayOfMonthInterval("FREQ=MONTHLY;BYDAY=-1FR")).toBe("-1");
        expect(parseCustomDayOfMonthInterval("FREQ=MONTHLY;BYDAY=2WE")).toBe("2");
        expect(parseCustomDayOfMonthInterval("FREQ=MONTHLY")).toBe("");
    });

    it("parse custom each or on the", () => {
        expect(parseCustomEachOrOnThe("FREQ=WEEKLY;BYDAY=MO,WE")).toBe("On The...");
        expect(parseCustomEachOrOnThe("FREQ=MONTHLY;BYMONTHDAY=1,15")).toBe("Each");
        expect(parseCustomEachOrOnThe("FREQ=DAILY")).toBe("Each");
    });
});