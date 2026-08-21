import { useEffect, useState } from "react";
import { parseCustomByDay, parseCustomByMonthDay, parseCustomDayOfMonthInterval, parseCustomEachOrOnThe, parseCustomFreq, parseCustomInterval } from "./parseRepeatString";
import CreateRepeatString from "./createRepeatString";

export type Freq = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
export type EachOrOnThe = "Each" | "On The...";
export type DayOfMonthInterval = "1" | "2" | "3" | "4" | "5" | "-1" | "";

export const FREQ_OPTIONS: Freq[] = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];

export const DAYS_OF_WEEK = [
    { label: "Sun", value: "SU" }, { label: "Mon", value: "MO" }, { label: "Tue", value: "TU" },
    { label: "Wed", value: "WE" }, { label: "Thu", value: "TH" }, { label: "Fri", value: "FR" },
    { label: "Sat", value: "SA" },
];

export const DAY_OF_MONTH_INTERVAL_OPTIONS: { label: string; value: DayOfMonthInterval }[] = [
    { label: "First", value: "1" }, { label: "Second", value: "2" }, { label: "Third", value: "3" },
    { label: "Fourth", value: "4" }, { label: "Fifth", value: "5" }, { label: "Last", value: "-1" },
];

interface RepeatStringParts {
    freq: Freq;
    interval: number;
    byDay: string[];
    byMonthDay: number[];
    dayOfMonthInterval: DayOfMonthInterval;
    eachOrOnThe: EachOrOnThe;
}

function getInitialRepeatString(customRepetition?: string): RepeatStringParts {
   if (!customRepetition) {
        return {
            freq: "DAILY",
            interval: 1,
            byDay: [],
            byMonthDay: [],
            dayOfMonthInterval: "",
            eachOrOnThe: "Each"
        };
    }

    return {
        freq: parseCustomFreq(customRepetition) as Freq,
        interval: parseCustomInterval(customRepetition),
        byDay: parseCustomByDay(customRepetition),
        byMonthDay: parseCustomByMonthDay(customRepetition),
        dayOfMonthInterval: parseCustomDayOfMonthInterval(customRepetition),
        eachOrOnThe: parseCustomEachOrOnThe(customRepetition) as EachOrOnThe
    };
}

export function useCustomRepeat(setCustomRepetition: (repetition: string) => void, customRepetition?: string,) {
    const { 
        freq: initialFreq, 
        interval: initialInterval, 
        byDay: initialByDay, 
        byMonthDay: initialByMonthDay, 
        dayOfMonthInterval: initialDayOfMonthInterval,
        eachOrOnThe: initialEachOrOnThe 
    } = getInitialRepeatString(customRepetition);
    
    const [freq, setFreq] = useState<Freq>(initialFreq);
    const [interval, setInterval] = useState<number>(initialInterval);
    const [byDay, setByDay] = useState<string[]>(initialByDay);
    const [dayOfMonthInterval, setDayOfMonthInterval] = useState<DayOfMonthInterval>(initialDayOfMonthInterval);
    const [byMonthDay, setByMonthDay] = useState<number[]>(initialByMonthDay);
    const [eachOrOnThe, setEachOrOnThe] = useState<EachOrOnThe>(initialEachOrOnThe);

    useEffect(() => {
            setCustomRepetition(CreateRepeatString(freq, interval, byDay, byMonthDay, dayOfMonthInterval));
        }, [freq, interval, byDay, byMonthDay, dayOfMonthInterval]);

    return {
        setFreq, setInterval, setByDay, setByMonthDay, setDayOfMonthInterval, setEachOrOnThe,
        freq, interval, byDay, byMonthDay, dayOfMonthInterval, eachOrOnThe
    };
}