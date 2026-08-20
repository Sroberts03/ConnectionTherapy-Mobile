import { ConnectionPillar } from "../../dashboard/dashboard.types";
import { usePillarContext } from "../../dashboard/PillarContext";
import { HabitCategory } from "../habits.types"
import * as LucideIcons from 'lucide-react-native';

interface PillarTheme {
    color: string
    IconComponent: React.ComponentType<any>
}

export function getPillarTheme(category: HabitCategory): PillarTheme {
    const { pillars } = usePillarContext()
    const pillar = pillars.get(category)
    let color = "#B0A69D"
    let iconName = "Circle"
    let IconComponent = LucideIcons.Circle
    if (pillar) {
        color = pillar.color
        iconName = pillar.icon.charAt(0).toUpperCase() + pillar.icon.slice(1)
        IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Circle;
    }
    return { color, IconComponent };
}