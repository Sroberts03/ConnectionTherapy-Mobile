import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useAuth } from "@src/features/auth/AuthContext";
import { getStartOfWeek, getToday } from "@utils/dates";
import { DailyCheck } from "../dailyCheck.types";
import { getDailyChecks } from "../services/dailyCheck.service";
import { getWeekStrip } from "./getWeekStrip";

// Reloads whenever the screen regains focus, so a check-in shows up as soon as you come back from it
export function useDailyChecks() {
    const { user } = useAuth();
    const [checks, setChecks] = useState<DailyCheck[]>([]);
    const [loading, setLoading] = useState(true);
    const today = getToday();
    const startOfWeek = getStartOfWeek();

    useFocusEffect(useCallback(() => {
        if (!user) return;
        getDailyChecks(user.id, startOfWeek, today)
            .then(setChecks)
            .catch(() => setChecks([]))
            .finally(() => setLoading(false));
    }, [user, startOfWeek, today]));

    return {
        loading,
        todayCheck: checks.find(check => check.date === today) ?? null,
        week: getWeekStrip(startOfWeek, today, checks),
    };
}
