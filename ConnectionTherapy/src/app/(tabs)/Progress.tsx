import GoToDailyCheck from "@src/features/daily-check/components/GoToDailyCheck";
import PillarProgressRow from "@src/features/dashboard/components/PillarProgressRow";
import { usePillarContext } from "@src/features/dashboard/PillarContext";
import ScreenHeader from "@src/globalComponents/ScreenHeader";
import { ScrollView, Text, View } from "react-native";
import { useProgressInsights } from "@src/features/progress/utils/useProgressInsights";
import StreakBanner from "@src/features/progress/components/StreakBanner";
import MoodInsightCard from "@src/features/progress/components/MoodInsightCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Progress() {
    const { pillars, loadingPillars } = usePillarContext();
    const pillarList = Array.from(pillars.values());
    const insights = useProgressInsights();

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-primary-50">
            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
                <View className="ios:mb-32 android:mb-4">
                    <ScreenHeader title="Progress" />

                    <Text className="text-xl font-bold text-neutral-900 mt-4">This Week</Text>
                    <Text className="text-sm text-neutral-600 mt-1 mb-4">
                        The goal is one habit in every pillar, every day.
                    </Text>
                    {insights && <StreakBanner streak={insights.streak} />}
                    {!loadingPillars && (
                        <View className="bg-white rounded-2xl px-5 border border-neutral-300">
                            {pillarList.map((pillar, index) => (
                                <PillarProgressRow
                                    key={pillar.id}
                                    pillar={pillar}
                                    isLast={index === pillarList.length - 1}
                                />
                            ))}
                        </View>
                    )}

                    <View className="mt-8">
                        <GoToDailyCheck />
                    </View>
                    {insights && (
                        <View className="mt-4">
                            <MoodInsightCard insight={insights.moodInsight} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
