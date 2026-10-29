import { Alert, View } from "react-native";
import { signOut } from "../../auth/services/auth.service";
import SettingsButtonsContainer from "./SettingsButtonsContainer";
import { SettingButton } from "../settings.types";

// Rows without a screen yet say so instead of silently doing nothing
const comingSoon = (title: string) => () => Alert.alert(title, "This is coming soon.");

export default function SettingsButtonArea() {
    const accountAndPreferencesbuttons: SettingButton[] = [
        { title: "Notifications", onPress: comingSoon("Notifications"), icon: "bell", comingSoon: true },
        //{ title: "Appearance", subtitle: "Customize the app's appearance", onPress: () => console.log("Appearance Settings pressed"), icon: "sun" },
    ]

    const legalAndInformationButtons: SettingButton[] = [
        { title: "Help & Support", onPress: comingSoon("Help & Support"), icon: "help-circle", comingSoon: true },
        { title: "Privacy Policy", onPress: comingSoon("Privacy Policy"), icon: "shield", comingSoon: true },
        { title: "Terms of Service", onPress: comingSoon("Terms of Service"), icon: "file-text", comingSoon: true },
        { title: "About", onPress: comingSoon("About"), icon: "info", comingSoon: true },
    ]

    const accountManagementButtons: SettingButton[] = [
        { title: "Edit Account", onPress: comingSoon("Edit Account"), icon: "settings", comingSoon: true },
        { title: "Delete Account", subtitle: "Permanently delete your account", onPress: comingSoon("Delete Account"), color: "#ef4444", icon: "trash-2", comingSoon: true },
        { title: "Sign Out", onPress: () => signOut(), color: "#5f5850", icon: "log-out" },
    ]

    return (
        <View className={`flex-1 px-4 ios:mb-32 android:mb-4`}>
            <SettingsButtonsContainer
                title="App Preferences"
                buttons={accountAndPreferencesbuttons}
                className="mb-2 mt-2"
            />
            <SettingsButtonsContainer
                title="Legal & Information"
                buttons={legalAndInformationButtons}
            />
            <SettingsButtonsContainer
                title="Account Management"
                buttons={accountManagementButtons}
            />
        </View>
    );
}