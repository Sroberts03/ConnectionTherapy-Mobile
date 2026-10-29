import { router } from "expo-router";

export function openCheckIn(date?: string) {
    router.push({ pathname: "/(daily-check)/DailyCheck", params: date ? { date } : {} });
}
