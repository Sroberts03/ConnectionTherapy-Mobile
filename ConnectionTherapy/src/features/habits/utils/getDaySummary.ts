interface DaySummary {
    message: string;
    // Share of the day's habits done, or null when there's nothing to measure
    percentDone: number | null;
}

export function getDaySummary(done: number, total: number, isToday: boolean): DaySummary {
    const dayWord = isToday ? "today" : "this day";
    if (total === 0) {
        return { message: `Nothing planned ${dayWord}. One small habit is a good start.`, percentDone: null };
    }
    const percentDone = Math.round((done / total) * 100);
    if (done === total) {
        return { message: `All ${total} done ${dayWord}. Nicely done 🌱`, percentDone };
    }
    return { message: `${done} of ${total} done ${dayWord}`, percentDone };
}
