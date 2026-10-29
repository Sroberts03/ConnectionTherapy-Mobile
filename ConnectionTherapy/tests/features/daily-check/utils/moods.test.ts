import { getMood, getMoodForScore, getMoodScore, isMoodKey, MOODS } from "../../../../src/features/daily-check/utils/moods";

describe("getMood", () => {
    it("finds a mood by its key", () => {
        expect(getMood("good")?.label).toBe("Good");
    });

    it("returns null for a missing or unknown key", () => {
        expect(getMood(null)).toBeNull();
        expect(getMood(undefined)).toBeNull();
        expect(getMood("ecstatic")).toBeNull();
    });
});

describe("isMoodKey", () => {
    it("accepts every listed mood and rejects anything else", () => {
        MOODS.forEach(mood => expect(isMoodKey(mood.key)).toBe(true));
        expect(isMoodKey("3")).toBe(false);
    });
});

describe("mood scores", () => {
    it("scores Rough to Great as 1 to 5", () => {
        expect(getMoodScore("rough")).toBe(1);
        expect(getMoodScore("great")).toBe(5);
    });

    it("rounds an average to the nearest mood and stays in range", () => {
        expect(getMoodForScore(3.6).key).toBe("good");
        expect(getMoodForScore(0).key).toBe("rough");
        expect(getMoodForScore(9).key).toBe("great");
    });
});
