import { View, Text, TextInput } from "react-native";

interface NewJournalEntryHeaderProps {
    date: string;
    title: string;
    setTitle: (title: string) => void;
    titleClassName?: string;
}

export default function NewJournalEntryHeader({  date, title, setTitle, titleClassName }: NewJournalEntryHeaderProps) {
    const titleStyle = titleClassName || "text-lg font-bold text-center text-text-primary px-8";

    return (
        <View className="bg-primary-50 border-b border-neutral-300 w-full">
            <TextInput
                value={title}
                placeholder={title || "Title"}
                placeholderTextColor="#7d756b"
                onChangeText={(text) => setTitle(text)}
                className={titleStyle + " w-full"}
            />
            <Text className="text-base text-center text-text-muted mt-1 mb-5">
                {date}
            </Text>
        </View>
    );
}