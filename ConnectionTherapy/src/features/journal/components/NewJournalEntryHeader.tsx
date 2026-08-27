import { View, Text, TextInput } from "react-native";

interface NewJournalEntryHeaderProps {
    date: string;
    title: string;
    setTitle: (title: string) => void;
    titleClassName?: string;
}

export default function NewJournalEntryHeader({  date, title, setTitle, titleClassName }: NewJournalEntryHeaderProps) {
    const titleStyle = titleClassName || "text-xl font-bold text-center text-text-primary mb-4";

    return (
        <View className="bg-primary-50 border-b border-gray-200 w-full">
            <View className="mb-4">
                <TextInput
                    value={title}
                    placeholder={title || "Title"}
                    onChangeText={(text) => setTitle(text)}
                    className={titleStyle + "w-full"}
                />
            </View>
            <Text className="text-sm text-center text-neutral-500 mb-4">
                {date}
            </Text>
        </View>
    );
}