import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface Props {
    className: string;
}
export default function BackButton({ className }: Props) {
    return (
        <TouchableOpacity onPress={() => router.back()} className={className} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
            <Feather name="chevron-left" size={24} color="#312c28" />
        </TouchableOpacity>
    );
}