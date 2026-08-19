import { View } from "react-native";

interface QuoteLoadingProps {
    loading: boolean;
}

export default function QuoteLoading({ loading }: QuoteLoadingProps) {
    if (!loading) return null;

    return (
        <View className="items-center w-full">
            <View className="w-full h-6 bg-gray-200 rounded mb-3 animate-pulse" />
            <View className="w-[80%] h-6 bg-gray-200 rounded mb-6 animate-pulse" />
            
            <View className="h-px w-12 bg-neutral-300 mb-4" />
            
            <View className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
        </View>
    );
}
