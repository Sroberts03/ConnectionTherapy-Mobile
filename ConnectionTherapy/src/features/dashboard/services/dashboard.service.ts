import { Session } from "@supabase/supabase-js";
import { ConnectionPillar } from "../dashboard.types";
import { HabitCategory } from "../../habits/habits.types";
import { GetPillarsRes } from "../dashboard.dto";
import { addDays, getStartOfWeek, getToday } from "../../../utils/dates";
import { getFirstHabitStartDataAccess, getPillarHabitsDataAccess } from "./dashboard.dataAccess";
import { getCountFrom, getLastWeekPercent, getPillarPercent } from "../utils/getPillarPercent";
import HTTPRequest from "@utils/HTTPRequest";

const MIN_DAYS_BEFORE_ALERT = 3;

export async function getDashboardPillars(session: Session): 
    Promise<Pick<ConnectionPillar, 'id' | 'name' | 'lightColor' | 'darkColor' | 'icon'>[]> 
{
    const httpRequest = new HTTPRequest();
    const response: GetPillarsRes = await httpRequest.SetEndpoint("pillar/all").NeedsAuth(session).Get().Send<GetPillarsRes>();
    
    const pillars = response.pillars.map((pillar) => ({
        id: pillar.id,
        name: pillar.name,
        lightColor: pillar.light_color,
        darkColor: pillar.dark_color,
        icon: pillar.icon
    }))
    return pillars
}

export async function getFullPillars(
    pillars: Pick<ConnectionPillar, 'id' | 'name' | 'lightColor' | 'darkColor' | 'icon'>[],
): Promise<Map<HabitCategory, ConnectionPillar>> {
    const fullPillars = new Map<HabitCategory, ConnectionPillar>();
    const startOfWeek = getStartOfWeek();
    const today = getToday();
    const firstStart = await getFirstHabitStartDataAccess();
    const countFrom = getCountFrom(startOfWeek, firstStart);
    const lastWeekStart = addDays(startOfWeek, -7);
    for (const pillar of pillars) {
        const pillarHabits = await getPillarHabitsDataAccess(pillar.name, startOfWeek, today);
        const lastWeekHabits = await getPillarHabitsDataAccess(pillar.name, lastWeekStart, addDays(startOfWeek, -1));
        const lastWeekPercentage = getLastWeekPercent(lastWeekHabits, lastWeekStart, startOfWeek, firstStart);
        const { percentage, evaluatedDays, daysCounted, daysShownUp, hasHabits } = getPillarPercent(pillarHabits, today, countFrom);
        // Too few finished days to call a trend, so don't raise an alarm yet
        const canJudge = evaluatedDays >= MIN_DAYS_BEFORE_ALERT;
        const concern = canJudge && percentage < 66;
        const danger = canJudge && percentage < 33;
        fullPillars.set(pillar.name, {...pillar, percentage, concern, danger, daysCounted, daysShownUp, hasHabits, lastWeekPercentage})
    }
    return fullPillars
}
    