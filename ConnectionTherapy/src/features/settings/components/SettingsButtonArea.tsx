import { TouchableOpacity, View, Text, Platform } from "react-native";
import { signOut } from "../../auth/services/auth.service";
import SettingsButtonsContainer from "./SettingsButtonsContainer";
import { SettingButton } from "../settings.types";

export default function SettingsButtonArea() {
    const accountAndPreferencesbuttons: SettingButton[] = [
        { title: "Notifications", subtitle: "Manage your notifications", onPress: () => console.log("Notification Settings pressed"), icon: "bell" },
        { title: "Appearance", subtitle: "Customize the app's appearance", onPress: () => console.log("Appearance Settings pressed"), icon: "sun" },
    ]

    const legalAndInformationButtons: SettingButton[] = [
        { title: "Help & Support", subtitle: "Get help and support", onPress: () => console.log("Help & Support pressed"), icon: "help-circle" },
        { title: "Privacy Policy", subtitle: "View our privacy policy", onPress: () => console.log("Privacy Policy pressed"), icon: "shield" },
        { title: "Terms of Service", subtitle: "View our terms of service", onPress: () => console.log("Terms of Service pressed"), icon: "file-text" },
        { title: "About", subtitle: "Learn more about the app", onPress: () => console.log("About pressed"), icon: "info" },
    ]

    const accountManagementButtons: SettingButton[] = [
        { title: "Edit Account", subtitle: "Manage your account", onPress: () => console.log("Account Settings pressed"), icon: "settings" },
        { title: "Delete Account", subtitle: "Permanently delete your account", onPress: () => console.log("Delete Account pressed"), color: "#ef4444", icon: "trash-2" },
        { title: "Sign Out", subtitle: "Sign out of your account", onPress: () => signOut(), color: "#ef4444", icon: "log-out" },
    ]

    return (
        <View className={`flex-1 px-4 mb-16`}>
            <SettingsButtonsContainer
                title="App Preferences"
                buttons={accountAndPreferencesbuttons}
                className="mb-2 mt-6"
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