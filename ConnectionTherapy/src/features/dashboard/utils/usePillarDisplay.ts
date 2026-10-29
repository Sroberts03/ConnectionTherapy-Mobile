import { useRouter } from "expo-router";
import { ConnectionPillar } from "../dashboard.types";
import { capitalize, getPillarStatus, getWeekChange } from "./getPillarStatus";
import { getPillarIcon } from "./getPillarIcon";

// What every pillar view needs: its icon, display name, status copy, and the way through to its habits
export function usePillarDisplay(pillar: ConnectionPillar) {
    const router = useRouter();
    const status = getPillarStatus(pillar);
    return {
        IconComponent: getPillarIcon(pillar.icon),
        name: capitalize(pillar.name),
        ...status,
        weekChange: status.hasScore ? getWeekChange(pillar.percentage, pillar.lastWeekPercentage) : null,
        openHabits: () => router.push("/(tabs)/Habits"),
    };
}
