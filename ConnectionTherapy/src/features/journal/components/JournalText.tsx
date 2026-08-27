import { Text, View } from "react-native";

interface JournalTextProps {
    text: string;
}

export default function JournalText({ text }: JournalTextProps) {
    return (
        <View className="p-4">
            <Text className="text-base text-text-primary">
                {text}
            </Text>
        </View>
    );
}