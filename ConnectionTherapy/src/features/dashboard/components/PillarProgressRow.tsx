import { ConnectionPillar } from "../dashboard.types";
import { Text, TouchableOpacity, View } from "react-native";
import { usePillarDisplay } from "../utils/usePillarDisplay";

interface PillarProgressRowProps {
    pillar: ConnectionPillar
    isLast: boolean
}

// The detailed read of a pillar: Home shows the ring, this shows the days behind it
export default function PillarProgressRow({ pillar, isLast }: PillarProgressRowProps) {
    const { IconComponent, name, hasScore, label, detail, openHabits } = usePillarDisplay(pillar);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={openHabits}
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
            {hasScore && <PillarProgressBar percentage={pillar.percentage} color={pillar.lightColor} />}
        </TouchableOpacity>
    )
}

function PillarProgressBar({ percentage, color }: { percentage: number, color: string }) {
    return (
        <View className="h-1.5 rounded-full bg-neutral-300 mt-3 overflow-hidden">
            <View className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }} />
        </View>
    )
}
