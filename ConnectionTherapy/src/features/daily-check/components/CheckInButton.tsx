import { Text, TouchableOpacity } from "react-native";
import { getSaveButtonStyle } from "../utils/checkInStyles";

interface CheckInButtonProps {
    canSave: boolean;
    isEditing: boolean;
    onPress: () => void;
}

// The mood is the check-in; nothing to save until one is picked
export default function CheckInButton({ canSave, isEditing, onPress }: CheckInButtonProps) {
    const style = getSaveButtonStyle(canSave);
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!canSave}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave }}
            className={`rounded-full py-4 items-center ${style.button}`}
        >
            <Text className={`text-base font-semibold ${style.text}`}>
                {isEditing ? "Update check-in" : "Check in"}
            </Text>
        </TouchableOpacity>
    );
}
