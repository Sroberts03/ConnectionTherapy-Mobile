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

export function useCustomRepeat(setCustomRepetition: (repetition: string) => void, customRepetition?: string,) {
    const [freq, setFreq] = useState<Freq>(customRepetition ? parseCustomFreq(customRepetition) as Freq : "DAILY");
    const [interval, setInterval] = useState<number>(customRepetition ? parseCustomInterval(customRepetition) : 1);
    const [byDay, setByDay] = useState<string[]>(customRepetition ? parseCustomByDay(customRepetition) : []);
    const [dayOfMonthInterval, setDayOfMonthInterval] = useState<DayOfMonthInterval>(
        customRepetition ? parseCustomDayOfMonthInterval(customRepetition) : ""
    );
    const [byMonthDay, setByMonthDay] = useState<number[]>(customRepetition ? parseCustomByMonthDay(customRepetition) : []);
    const [eachOrOnThe, setEachOrOnThe] = useState<EachOrOnThe>(
        customRepetition ? parseCustomEachOrOnThe(customRepetition) as EachOrOnThe : "Each"
    );

    useEffect(() => {
            setCustomRepetition(CreateRepeatString(freq, interval, byDay, byMonthDay, dayOfMonthInterval));
        }, [freq, interval, byDay, byMonthDay, dayOfMonthInterval]);

    return {
        setFreq, setInterval, setByDay, setByMonthDay, setDayOfMonthInterval, setEachOrOnThe,
        freq, interval, byDay, byMonthDay, dayOfMonthInterval, eachOrOnThe
    };
}

    