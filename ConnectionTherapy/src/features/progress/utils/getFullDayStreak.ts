import { addDays } from "@utils/dates";
import { HabitSpan, PillarDay, Streak } from "../progress.types";
import { getRequiredPillars, groupPillarsByDate } from "./getRequiredPillars";

// A full day is one habit done in every pillar you'd started by then.
// Today only adds to the streak once it's full; until then the streak runs to yesterday
export function getFullDayStreak(pillarDays: PillarDay[], spans: HabitSpan[], today: string): Streak {
    const firstStart = spans.map(span => span.startDate).sort()[0];
    if (!firstStart || firstStart > today) return { current: 0, best: 0, todayFull: false };

    const hitByDate = groupPillarsByDate(pillarDays);
    const isFull = (date: string) => {
        const required = getRequiredPillars(spans, date);
        const hit = hitByDate.get(date);
        return required.size > 0 && [...required].every(pillar => hit?.has(pillar));
    };

    let best = 0;
    let run = 0;
    for (let date = firstStart; date <= today; date = addDays(date, 1)) {
        run = isFull(date) ? run + 1 : 0;
        best = Math.max(best, run);
    }

    const todayFull = isFull(today);
    let current = 0;
    for (let date = todayFull ? today : addDays(today, -1); date >= firstStart && isFull(date); date = addDays(date, -1)) {
        current++;
    }
    return { current, best, todayFull };
}
