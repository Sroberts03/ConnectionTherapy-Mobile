import { TextInput, View } from "react-native";

interface JournalTextEntryProps {
    text: string;
    setText: (text: string) => void;
}

export default function JournalTextEntry({ text, setText }: JournalTextEntryProps) {
    return (
        // Same insets as JournalText so writing and reading line up
        <View className="flex-1 w-full p-4">
            <TextInput
                value={text}
                onChangeText={(newText) => setText(newText)}
                placeholder="Write how you feel here..."
                placeholderTextColor="#7d756b"
                multiline
                className="flex-1 text-base text-text-primary"
                style={{ padding: 0 }}
            />
        </View>
    );
}