import { ConnectionPillar } from "../dashboard.types";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import * as LucideIcons from 'lucide-react-native';
import { getPillarStatus } from "../utils/getPillarStatus";

interface PillarProgressRowProps {
    pillar: ConnectionPillar
    isLast: boolean
}

// The detailed read of a pillar: Home shows the ring, this shows the days behind it
export default function PillarProgressRow({ pillar, isLast }: PillarProgressRowProps) {
    const router = useRouter();
    const iconName = pillar.icon.charAt(0).toUpperCase() + pillar.icon.slice(1);
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Circle;
    const name = pillar.name.charAt(0).toUpperCase() + pillar.name.slice(1);
    const { hasScore, label } = getPillarStatus(pillar);

    const detail = !pillar.hasHabits
        ? "No habits yet"
        : hasScore
            ? `Showed up ${pillar.daysShownUp} of ${pillar.daysCounted} ${pillar.daysCounted === 1 ? "day" : "days"}`
            : "Your first day counts once it's done";

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/Habits")}
            accessibilityRole="button"
            accessibilityLabel={`${name}. ${detail}. View habits`}
            className={`py-4 ${isLast ? "" : "border-b border-neutral-300"}`}
        >
            <View className="flex-row items-center">
                <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${pillar.lightColor}22` }}
                >
                    <IconComponent size={20} color="#7d756b" />
                </View>
                <View className="flex-1 ml-3">
                    <Text className="text-base font-semibold text-neutral-900">{name}</Text>
                    <Text className="text-sm text-neutral-600 mt-0.5">{detail}</Text>
                </View>
                <Text className={hasScore ? "text-lg font-bold text-neutral-900" : "text-sm font-medium text-neutral-500"}>
                    {label}
                </Text>
            </View>
            {hasScore && (
                <View className="h-1.5 rounded-full bg-neutral-300 mt-3 overflow-hidden">
                    <View
                        className="h-full rounded-full"
                        style={{ width: `${pillar.percentage}%`, backgroundColor: pillar.lightColor }}
                    />
                </View>
            )}
        </TouchableOpacity>
    )
}
