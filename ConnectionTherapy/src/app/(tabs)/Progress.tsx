import GoToDailyCheck from "@src/features/daily-check/components/GoToDailyCheck";
import PillarProgressRow from "@src/features/dashboard/components/PillarProgressRow";
import { usePillarContext } from "@src/features/dashboard/PillarContext";
import ScreenHeader from "@src/globalComponents/ScreenHeader";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Progress() {
    const { pillars, loadingPillars } = usePillarContext();
    const pillarList = Array.from(pillars.values());

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-primary-50">
            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
                <View className="ios:mb-32 android:mb-4">
                    <ScreenHeader title="Progress" />

                    <Text className="text-xl font-bold text-neutral-900 mt-4">This Week</Text>
                    <Text className="text-sm text-neutral-600 mt-1 mb-4">
                        How many of your scheduled days you showed up for each pillar.
                    </Text>
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
                        <GoToDailyCheck isVisible={true} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
