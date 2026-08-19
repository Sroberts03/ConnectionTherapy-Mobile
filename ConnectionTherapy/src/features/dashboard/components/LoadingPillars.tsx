import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface LoadingPillarsProps {
    loadingPillars: boolean;
}

const SkeletonPillar = () => {
    return (
        <View 
            className="bg-white rounded-xl border border-gray-100 items-center justify-center w-[140px] h-[150px]"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2
            }}
        >
            <View className="items-center justify-center relative mt-2 w-[60px] h-[60px]">
                <View className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse" />
            </View>

            <View className="bg-gray-200 w-16 h-4 rounded mt-4 animate-pulse" />
            <View className="bg-gray-200 w-10 h-6 rounded mt-2 animate-pulse" />
        </View>
    );
};

export default function LoadingPillars({ loadingPillars }: LoadingPillarsProps) {
    const router = useRouter();

    if (!loadingPillars) return null;
    
    const skeletonItems = [1, 2, 3, 4];

    return (
        <View className="mt-4">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xl font-bold text-neutral-900">Life's Pillars of Connection</Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/Habits")} className="flex-row items-center gap-1">
                    <Text className="text-primary-700 font-medium">View Habits</Text>
                    <Ionicons name="chevron-forward" size={18} color="#222222" />
                </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-center gap-4">
                {skeletonItems.map((item) => (
                    <SkeletonPillar key={`skeleton-${item}`} />
                ))}
            </View>
        </View>
    )
}