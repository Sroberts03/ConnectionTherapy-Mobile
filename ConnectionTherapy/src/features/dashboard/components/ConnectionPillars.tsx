import { Text, View } from "react-native";
import { ConnectionPillar } from "../dashboard.types";
import { HabitCategory } from "../../habits/habits.types";
import PillarContainer from "./PillarContainer";

interface ConnectionPillarsProps {
    pillars: Map<HabitCategory, ConnectionPillar>
}

export default function ConnectionPillars({ pillars }: ConnectionPillarsProps) {
    return (
        <View className="mt-4">
            <Text className="text-xl font-bold text-neutral-900 w-full text-center mb-2">Life's Pillars of Connection</Text>
            <View className="flex-row flex-wrap justify-center gap-4">
                {Array.from(pillars.values()).map((pillar) => (
                    <PillarContainer key={pillar.id} pillar={pillar} />
                ))}
            </View>
        </View>
    )
}