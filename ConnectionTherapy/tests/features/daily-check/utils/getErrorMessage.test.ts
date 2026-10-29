import { getErrorMessage } from "../../../../src/features/daily-check/utils/getErrorMessage";

describe("getErrorMessage", () => {
    it("uses the error's own message", () => {
        expect(getErrorMessage(new Error("disk full"), "fallback")).toBe("disk full");
    });

    it("falls back for anything that isn't an Error", () => {
        expect(getErrorMessage("nope", "fallback")).toBe("fallback");
    });
});
