import { View } from "react-native";
import { useRouter } from "expo-router";
import ViewOtherInfoButton from "./ViewOtherInfoButton";

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
            <ViewOtherInfoButton onPress={() => router.push("/(tabs)/Habits")} text="View Progress" />
            <View className="flex-row flex-wrap justify-center gap-4">
                {skeletonItems.map((item) => (
                    <SkeletonPillar key={`skeleton-${item}`} />
                ))}
            </View>
        </View>
    )
}