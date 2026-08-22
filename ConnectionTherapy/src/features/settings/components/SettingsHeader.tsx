import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function SettingsHeader() {
    return (
        <View className="mt-20">
            <Ionicons name="settings-outline" size={80} color="#4B5563" className="self-center"/>
        </View>
    );
}