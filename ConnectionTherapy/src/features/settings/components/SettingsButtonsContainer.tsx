import { View, Text } from "react-native";
import ManageButton from "../../../globalComponents/ManageButton";
import { SettingButton } from "../settings.types";

interface SettingsButtonsContainerProps {
    buttons: SettingButton[];
    title: string;
    className?: string;
}

export default function SettingsButtonsContainer({ buttons, title, className }: SettingsButtonsContainerProps) {
    const getSettingsButton = (button: SettingButton) => (
        <ManageButton
            title={button.title}
            subtitle={button.subtitle}
            onPress={button.onPress}
            color={button.color}
            icon={button.icon}
            badge={button.comingSoon ? "Soon" : undefined}
        />
    )
    
    return (
        <View className={className ? className : "mb-2 mt-4"}>
            <View className="ml-2">
                <Text className="text-sm font-semibold uppercase tracking-wide text-neutral-600 mb-3">{title}</Text>
            </View>
            {buttons.map((button, index) => (
                <View key={index} className="mb-2">
                    {getSettingsButton(button)}
                </View>
            ))}
        </View>
    );
}