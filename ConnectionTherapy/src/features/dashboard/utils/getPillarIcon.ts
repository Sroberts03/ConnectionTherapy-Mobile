import * as LucideIcons from 'lucide-react-native';
import { capitalize } from "./getPillarStatus";

type IconComponent = React.ComponentType<any>;

// Pillars name their icon in lowercase ("leaf"); Lucide exports it capitalised ("Leaf")
export function getPillarIcon(icon: string): IconComponent {
    const icons = LucideIcons as unknown as Record<string, IconComponent | undefined>;
    return icons[capitalize(icon)] ?? LucideIcons.Circle;
}
