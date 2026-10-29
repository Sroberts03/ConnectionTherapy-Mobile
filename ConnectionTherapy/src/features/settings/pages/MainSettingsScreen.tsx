import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsButtonArea from "../components/SettingsButtonArea";
import SettingsHeader from "../components/SettingsHeader";

export default function MainSettingsScreen() {

    return (
        <SafeAreaView edges={["top"]} className={`flex-1 bg-primary-50`}>
            <ScrollView
                className={`flex-1`}
            >
                <SettingsHeader />
                <SettingsButtonArea />
            </ScrollView>
        </SafeAreaView>
    );
}
    