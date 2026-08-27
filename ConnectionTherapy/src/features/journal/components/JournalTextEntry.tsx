import { TextInput, View } from "react-native";

interface JournalTextEntryProps {
    text: string;
    setText: (text: string) => void;
}

export default function JournalTextEntry({ text, setText }: JournalTextEntryProps) {
    return (
        <View className="flex-1 w-full">
            <TextInput
                value={text}
                onChangeText={(newText) => setText(newText)}
                placeholder="Write how you feel here..."
                multiline
                className="flex-1 p-4 text-text-primary"
            />
        </View>
    );
}