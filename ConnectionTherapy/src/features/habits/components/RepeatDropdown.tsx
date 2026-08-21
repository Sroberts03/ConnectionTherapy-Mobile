import { TouchableOpacity, View, Text} from "react-native";
import { repeatOptions } from "../utils/getRepeatLabel";

interface RepeatDropdownProps {
    isVisible: boolean;
    repetition: string;
    setShowRepeatDropdown: (show: boolean) => void;
    setRepetition: (repeat: string) => void;
}

export default function RepeatDropdown({ isVisible, repetition, setShowRepeatDropdown, setRepetition }: RepeatDropdownProps) {
    if (!isVisible) return null;

    return (
        <View className="bg-white border border-neutral-200 rounded-2xl mt-2 overflow-hidden">
            {repeatOptions.map((opt, index) => (
                <TouchableOpacity
                    key={opt.value}
                    onPress={() => {
                        setRepetition(opt.value);
                        setShowRepeatDropdown(false);
                    }}
                    className={`px-4 py-4 ${index < repeatOptions.length - 1 ? 'border-b border-neutral-100' : ''} ${repetition === opt.value ? 'bg-teal-50' : ''}`}
                >
                    <Text className={`text-base font-medium ${repetition === opt.value ? 'text-teal-700' : 'text-neutral-700'}`}>
                        {opt.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}