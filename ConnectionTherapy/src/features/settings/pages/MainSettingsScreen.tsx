import { View, ScrollView, Text } from "react-native";
import { useAuth } from "../../auth/AuthContext";
import SettingsButtonArea from "../components/SettingsButtonArea";
import SettingsHeader from "../components/SettingsHeader";

export default function MainSettingsScreen() {

    return (
        <View className={`flex-1 bg-primary-50`}>
            <ScrollView
                className={`flex-1 ios:mb-4 android:-mb-16`}
            >
                <SettingsHeader />
                <SettingsButtonArea />
            </ScrollView>
        </View>
    );
}
    