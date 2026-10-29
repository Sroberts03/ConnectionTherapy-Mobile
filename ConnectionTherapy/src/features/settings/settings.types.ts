import { Feather } from "@expo/vector-icons"

export interface SettingButton {
    title: string;
    subtitle?: string;
    // Not built yet: the row says so up front rather than after a tap
    comingSoon?: boolean;
    onPress: () => void;
    color?: string;
    icon: keyof typeof Feather.glyphMap;
}