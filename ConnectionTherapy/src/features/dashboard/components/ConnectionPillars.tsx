import { Text, TouchableOpacity, View } from "react-native";
import { ConnectionPillar } from "../dashboard.types";
import { HabitCategory } from "../../habits/habits.types";
import PillarContainer from "./PillarContainer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ConnectionPillarsProps {
    pillars: Map<HabitCategory, ConnectionPillar>
}

export default function ConnectionPillars({ pillars }: ConnectionPillarsProps) {
    const router = useRouter()
    return (
        <View className="mt-4">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xl font-bold text-neutral-900">Life's Pillars of Connection</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/Habits")} className="flex-row items-center gap-1">
                    <Text className="text-primary-700 font-medium">View Analytics</Text>
                    <Ionicons name="chevron-forward" size={18} color="#222222" />
                </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-center gap-4">
                {Array.from(pillars.values()).map((pillar) => (
                    <PillarContainer key={pillar.id} pillar={pillar} />
                ))}
            </View>
        </View>
    )
}