import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@src/features/auth/AuthContext";
import { getToday } from "@utils/dates";
import { MoodKey } from "../dailyCheck.types";
import { getDailyChecks, saveDailyCheck } from "../services/dailyCheck.service";
import { normaliseNotes } from "./normaliseNotes";
import { resolveCheckInDate } from "./resolveCheckInDate";
import { getErrorMessage } from "./getErrorMessage";

export function useDailyCheckForm(requestedDate: string | undefined) {
    const { user } = useAuth();
    const today = getToday();
    const date = resolveCheckInDate(requestedDate, today);
    const [mood, setMood] = useState<MoodKey | null>(null);
    const [notes, setNotes] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    // A day that already has a check-in opens it for editing
    useEffect(() => {
        if (!user) return;
        getDailyChecks(user.id, date, date).then(([existing]) => {
            if (!existing) return;
            setMood(existing.mood);
            setNotes(existing.notes ?? "");
            setIsEditing(true);
        });
    }, [user, date]);

    const save = async () => {
        if (!user || !mood) return;
        try {
            await saveDailyCheck(user.id, { date, mood, notes: normaliseNotes(notes) });
            router.back();
        } catch (err) {
            setError(getErrorMessage(err, "Couldn't save your check-in"));
        }
    };

    return { date, isToday: date === today, mood, setMood, notes, setNotes, isEditing, error, save };
}
