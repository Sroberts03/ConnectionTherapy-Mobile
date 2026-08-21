import getDates from "../../../../src/features/habits/utils/getDates";

describe("getDates", () => {
    it("returns the start date when repetition is None", () => {
        const startDate = "2023-01-01";
        const endDate = null;
        const repetition = "None";
        const result = getDates(startDate, endDate, repetition);
        expect(result).toEqual([new Date("2023-01-01T00:00:00")]);
    });

    it("returns dates for a daily repetition within two weeks", () => {
        const startDate = "2023-01-01";
        const endDate = null;
        const repetition = "FREQ=DAILY;INTERVAL=1";
        const result = getDates(startDate, endDate, repetition);
        expect(result.length).toBe(14);
    });

    it("respects the provided end date if it's before two weeks", () => {
        const startDate = "2023-01-01";
        const endDate = "2023-01-05";
        const repetition = "FREQ=DAILY;INTERVAL=1";
        const result = getDates(startDate, endDate, repetition);
        expect(result.length).toBe(5);
    });

    it("returns an empty array if the repetition is invalid", () => {
        const startDate = "2023-01-01";
        const endDate = null;
        const repetition = "INVALID";
        const result = getDates(startDate, endDate, repetition);
        expect(result).toEqual([new Date("2023-01-01T00:00:00")]);
    });
});