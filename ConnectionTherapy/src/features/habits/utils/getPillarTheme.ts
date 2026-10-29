import { usePillarContext } from "../../dashboard/PillarContext";
import { HabitCategory } from "../habits.types"
import * as LucideIcons from 'lucide-react-native';
import { getPillarIcon } from "../../dashboard/utils/getPillarIcon";

interface PillarTheme {
    color: string
    IconComponent: React.ComponentType<any>
}

export function getPillarTheme(category: HabitCategory): PillarTheme {
    const { pillars } = usePillarContext()
    const pillar = pillars.get(category)
    if (!pillar) {
        return { color: "#B0A69D", IconComponent: LucideIcons.Circle };
    }
    return { color: pillar.lightColor, IconComponent: getPillarIcon(pillar.icon) };
}