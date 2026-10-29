import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useAuth } from "@src/features/auth/AuthContext";
import { getToday } from "@utils/dates";
import { MoodInsight, Streak } from "../progress.types";
import { getProgressInsights } from "../services/progress.service";

// Habits and check-ins change on other screens, so recount whenever Progress comes back into view
export function useProgressInsights() {
    const { user } = useAuth();
    const [insights, setInsights] = useState<{ streak: Streak; moodInsight: MoodInsight } | null>(null);

    useFocusEffect(useCallback(() => {
        if (!user) return;
        getProgressInsights(user.id, getToday()).then(setInsights).catch(() => setInsights(null));
    }, [user]));

    return insights;
}
