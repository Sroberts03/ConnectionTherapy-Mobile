import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface JournalButtonProps {
    onPress: () => void;
    isVisible: boolean;
    iconName?: keyof typeof Ionicons.glyphMap;
    className?: string;
}

export default function JournalButton({ onPress, isVisible, iconName, className }: JournalButtonProps) {
    if (!isVisible) return null;

    const style = `${className ? className : "absolute bottom-24 right-4 bg-primary-500 p-4 rounded-full shadow-lg"}`;

    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={onPress}
            className={style}
        >
            <Ionicons name={iconName || "pencil"} size={24} color="#fff" />
        </TouchableOpacity>
    );
}