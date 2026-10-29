import { Text, View } from "react-native";
import { MoodGroup, MoodInsight } from "../progress.types";
import { getMoodInsightMessage } from "../utils/getMoodInsightMessage";

export default function MoodInsightCard({ insight }: { insight: MoodInsight }) {
    return (
        <View className="bg-white rounded-2xl p-5 border border-neutral-300">
            <Text className="text-lg font-bold text-neutral-900 mb-1">Mood and your pillars</Text>
            {insight.status === "ready"
                ? <MoodComparison more={insight.more} fewer={insight.fewer} checkIns={insight.checkIns} />
                : <Text className="text-sm text-neutral-600 leading-5">{getMoodInsightMessage(insight)}</Text>}
        </View>
    );
}

function MoodComparison({ more, fewer, checkIns }: { more: MoodGroup; fewer: MoodGroup; checkIns: number }) {
    return (
        <View>
            <Text className="text-sm text-neutral-600 mb-3">Your average mood, from {checkIns} check-ins</Text>
            <MoodGroupRow group={more} />
            <MoodGroupRow group={fewer} />
        </View>
    );
}

function MoodGroupRow({ group }: { group: MoodGroup }) {
    return (
        <View className="flex-row items-center py-2" accessible accessibilityLabel={`Days with ${group.label}: ${group.mood.label}`}>
            <Text className="text-2xl mr-3">{group.mood.emoji}</Text>
            <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-900">{group.mood.label}</Text>
                <Text className="text-sm text-neutral-600">Days you hit {group.label} · {group.days} {group.days === 1 ? "day" : "days"}</Text>
            </View>
        </View>
    );
}
