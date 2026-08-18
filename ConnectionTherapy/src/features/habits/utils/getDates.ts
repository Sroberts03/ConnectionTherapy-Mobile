import { RRule, rrulestr } from 'rrule';

export default function getDates( startDate: string, endDate: string | null | undefined, repetition: string | null | undefined ) {
    let occurenceDates: Date[] = [];
    const start = new Date(`${startDate}T00:00:00`);
    const twoWeeksOut = new Date(start);
    twoWeeksOut.setDate(twoWeeksOut.getDate() + 14);
    
    let boundaryEnd = twoWeeksOut;
    if (endDate) {
        const providedEnd = new Date(`${endDate}T23:59:59`);
        boundaryEnd = providedEnd < twoWeeksOut ? providedEnd : twoWeeksOut;
    }

    if (repetition === "None" || !repetition) {
        occurenceDates = [start]
    } else {
        const parsedRule = rrulestr(repetition);
        const ruleWithStart = new RRule({
            ...parsedRule.options,
            dtstart: start,
        })
        occurenceDates = ruleWithStart.between(start, boundaryEnd, true)
    }
    return occurenceDates;
}