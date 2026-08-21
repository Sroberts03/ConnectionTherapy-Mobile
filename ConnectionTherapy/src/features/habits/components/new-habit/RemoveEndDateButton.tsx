import { TouchableOpacity, Text } from "react-native";

export default function RemoveEndDateButton({ isVisible, onPress }: { isVisible: boolean; onPress: () => void }) {
    if (!isVisible) return null;
    return (
        <TouchableOpacity
            className="items-center"
            onPress={onPress}
        >
            <Text className="text-red-600">Remove End Date</Text>
        </TouchableOpacity>
    );
}