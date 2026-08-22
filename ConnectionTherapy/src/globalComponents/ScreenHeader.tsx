import { View, Text } from "react-native";

interface ScreenHeaderProps {
    title: string;
    titleClassName?: string;
    subtitle?: string;
}

export default function ScreenHeader({ title, titleClassName, subtitle }: ScreenHeaderProps) {
    const titleStyle = titleClassName || "text-2xl font-bold text-center text-text-primary";

    return (
        <View className="bg-primary-50 border-b border-gray-200 w-full">
            <Text className={titleStyle + ` ${!subtitle ? "mb-5" : ""}`}>
                {title}
            </Text>
            {subtitle && (
                <Text className="text-base text-text-muted mt-1 mb-5 text-center">
                    {subtitle}
                </Text>
            )}
        </View>
    );
}
