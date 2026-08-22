import { View, Text } from "react-native";
import ManageButton from "../../../globalComponents/ManageButton";
import { SettingButton } from "../settings.types";

interface SettingsButtonsContainerProps {
    buttons: SettingButton[];
    title: string;
    className?: string;
}

export default function SettingsButtonsContainer({ buttons, title, className }: SettingsButtonsContainerProps) {
    return (
        <View className={className ? className : "mb-2 mt-4"}>
            <View className="ml-2">
                <Text className="text-md font-semibold mb-4">{title}</Text>
            </View>
            {buttons.map((button, index) => (
                <ManageButton
                    key={index}
                    title={button.title}
                    subtitle={button.subtitle}
                    onPress={button.onPress}
                    color={button.color}
                    icon={button.icon}
                />
            ))}
        </View>
    );
}