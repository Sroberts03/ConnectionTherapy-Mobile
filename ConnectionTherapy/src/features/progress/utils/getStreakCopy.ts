import { Streak } from "../progress.types";

const days = (count: number) => `${count} full ${count === 1 ? "day" : "days"}`;

export function getStreakCopy({ current, best, todayFull }: Streak): { title: string; detail: string } {
    if (current === 0) {
        return {
            title: todayFull ? "First full day" : "No full days yet",
            detail: "A full day is one habit in every pillar you've started",
        };
    }
    return {
        title: `${days(current)} in a row`,
        detail: todayFull ? `Best: ${days(best)}` : `Finish today to make it ${current + 1}`,
    };
}
