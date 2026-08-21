import { RRule, rrulestr } from 'rrule';
import { FREQ_OPTIONS } from './useCustomRepeat';

export default function getDates( startDate: string, endDate: string | null | undefined, repetition: string | null | undefined ) {
    let occurenceDates: Date[] = [];
    const start = new Date(`${startDate}T00:00:00`);
    const twoWeeksOut = new Date(start);
    twoWeeksOut.setDate(twoWeeksOut.getDate() + 14);
    
    let boundaryEnd = twoWeeksOut;
    boundaryEnd = addEndDateCheck(boundaryEnd, endDate, twoWeeksOut);
    occurenceDates = noRepetitionCheck(repetition, start);
    if (repetitionExists(occurenceDates)) {
        occurenceDates = getOccuranceDates(start, boundaryEnd, repetition!);
    }
    return occurenceDates;
}

function addEndDateCheck(boundaryEnd: Date, endDate: string | null | undefined, twoWeeksOut: Date = new Date()): Date {
    if (endDate) {
        const providedEnd = new Date(`${endDate}T23:59:59`);
        boundaryEnd = providedEnd < twoWeeksOut ? providedEnd : twoWeeksOut;
    }
    return boundaryEnd;
}

function noRepetitionCheck(repetition: string | null | undefined, start: Date): Date[] {
    if (repetition === "None" || !repetition) {
        return [start];
    }
    return [];
}

function getOccuranceDates(start: Date, boundaryEnd: Date, repetition: string): Date[] {
    let ruleWithStart: RRule;
    try {
        const parsedRule = rrulestr(repetition);
        ruleWithStart = new RRule({
            ...parsedRule.options,
            dtstart: start,
        })
    } catch (error) {
        console.error("Error parsing repetition string:", error);
        return [start];
    }
    return ruleWithStart.between(start, boundaryEnd, true);
}

function repetitionExists(occuranceDates: Date[]): boolean {
    return occuranceDates.length === 0;
}