import { View } from "react-native";

export default function SkeletonJournalEntryCard() {
    return (
        <View className="bg-white rounded-2xl border border-neutral-200 mb-4 p-4 shadow-sm">
            <View className="h-4 w-1/2 rounded-full bg-neutral-300 animate-pulse mb-4" />

            <View className="mb-3 h-4 w-full rounded-full bg-neutral-300 animate-pulse" />
            <View className="mb-3 h-4 w-11/12 rounded-full bg-neutral-300 animate-pulse" />
            <View className="mb-3 h-4 w-full rounded-full bg-neutral-300 animate-pulse" />
            <View className="mb-3 h-4 w-9/12 rounded-full bg-neutral-300 animate-pulse" />

            <View className="h-4 w-1/4 rounded-full bg-neutral-300 mr-2 animate-pulse" />
        </View>
    );
}