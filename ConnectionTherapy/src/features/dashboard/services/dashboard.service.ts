import { Session } from "@supabase/supabase-js";
import HTTPRequest from "../../../utils/baseHTTPRequest";
import { ConnectionPillar } from "../dashboard.types";
import { SQLiteDatabase } from "expo-sqlite";
import { HabitCategory } from "../../habits/habits.types";
import { GetPillarsRes } from "../dashboard.dto";
import { getStartOfWeek, getToday } from "../../../utils/dates";
import { getPillarHabitsDataAccess } from "./dashboard.dataAccess";
import { getPillarPercent } from "../utils/getPillarPercent";

export async function getDashboardPillars(session: Session): 
    Promise<Pick<ConnectionPillar, 'id' | 'name' | 'color' | 'icon'>[]> {
    const response: GetPillarsRes = await HTTPRequest("GET", "pillar/all", true, session)
    return response.pillars
}

export async function getFullPillars(
    pillars: Pick<ConnectionPillar, 'id' | 'name' | 'color' | 'icon'>[],
    db: SQLiteDatabase
): Promise<Map<HabitCategory, ConnectionPillar>> {
    const fullPillars = new Map<HabitCategory, ConnectionPillar>();
    const startOfWeek = getStartOfWeek();
    const dayOfWeek = new Date().getDay();
    for (const pillar of pillars) {
        const pillarHabits = await getPillarHabitsDataAccess(pillar.name, startOfWeek, getToday(), db);
        const percentage = getPillarPercent(pillarHabits, dayOfWeek);
        const concern = percentage < 66;
        const danger = percentage < 33;
        fullPillars.set(pillar.name, {...pillar, percentage, concern, danger})
    }
    return fullPillars
}
    