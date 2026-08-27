import { View } from "react-native";
import { ConnectionPillar } from "../dashboard.types";
import { HabitCategory } from "../../habits/habits.types";
import PillarContainer from "./PillarContainer";
import { useRouter } from "expo-router";
import ViewOtherInfoButton from "./ViewOtherInfoButton";

interface ConnectionPillarsProps {
    pillars: Map<HabitCategory, ConnectionPillar>
}

export default function ConnectionPillars({ pillars }: ConnectionPillarsProps) {
    const router = useRouter()
    return (
        <View className="mt-4">
            <ViewOtherInfoButton onPress={() => router.push("/(tabs)/Habits")} text="View Progress" />
            <View className="flex-row flex-wrap justify-center gap-4">
                {Array.from(pillars.values()).map((pillar) => (
                    <PillarContainer key={pillar.id} pillar={pillar} />
                ))}
            </View>
        </View>
    )
}