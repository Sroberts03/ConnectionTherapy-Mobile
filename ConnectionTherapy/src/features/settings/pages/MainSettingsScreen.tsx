import { View, ScrollView } from "react-native";
import { useAuth } from "../../auth/AuthContext";
import SettingsButtonArea from "../components/SettingsButtonArea";
import SettingsHeader from "../components/SettingsHeader";

export default function MainSettingsScreen() {
    const { signOut } = useAuth();

    return (
        <View className={`flex-1 bg-primary-50`}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SettingsHeader />
                <SettingsButtonArea />
            </ScrollView>
        </View>
    );
}
    