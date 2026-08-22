import { Feather } from "@expo/vector-icons"

export interface SettingButton {
    title: string;
    subtitle: string;
    onPress: () => void;
    color?: string;
    icon: keyof typeof Feather.glyphMap;
}