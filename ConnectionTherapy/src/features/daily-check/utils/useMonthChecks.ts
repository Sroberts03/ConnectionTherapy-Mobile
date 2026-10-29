import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useAuth } from "@src/features/auth/AuthContext";
import { DailyCheck } from "../dailyCheck.types";
import { getDailyChecks } from "../services/dailyCheck.service";
import { getMonthEnd } from "./getMonthGrid";

// Reloads on focus too, so a day filled in from the calendar shows up on return
export function useMonthChecks(monthStart: string) {
    const { user } = useAuth();
    const [checks, setChecks] = useState<DailyCheck[]>([]);

    useFocusEffect(useCallback(() => {
        if (!user) return;
        getDailyChecks(user.id, monthStart, getMonthEnd(monthStart))
            .then(setChecks)
            .catch(() => setChecks([]));
    }, [user, monthStart]));

    return checks;
}
