import { Text, View } from "react-native";
import { signOut } from "../../auth/services/auth.service";
import SettingsButtonsContainer from "./SettingsButtonsContainer";
import { SettingButton } from "../settings.types";

// Only rows that work are shown; everything still being built is named once below them
// instead of as a stack of rows that can't be tapped
const comingSoon = ["Notifications", "help & support", "legal pages", "account editing"];

export default function SettingsButtonArea() {
    const accountButtons: SettingButton[] = [
        { title: "Sign Out", onPress: () => signOut(), color: "#5f5850", icon: "log-out" },
    ]

    return (
        <View className={`flex-1 px-4 ios:mb-32 android:mb-4`}>
            <SettingsButtonsContainer
                title="Account"
                buttons={accountButtons}
                className="mb-2 mt-2"
            />
            <Text className="text-sm text-neutral-600 mx-2 leading-5">
                {`${comingSoon.slice(0, -1).join(", ")} and ${comingSoon.at(-1)} are on the way.`}
            </Text>
        </View>
    );
}
