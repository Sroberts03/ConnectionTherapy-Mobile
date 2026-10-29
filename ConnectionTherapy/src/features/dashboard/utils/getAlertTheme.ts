import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

interface AlertTheme {
    iconName: IoniconName;
    iconColor: string;
    bgColor: string;
    title: string;
    text: string;
}

// Warm amber rather than red: these are nudges, not emergencies
export default function getAlertTheme(danger: boolean, name: string): AlertTheme {
    if (danger) {
        return {
            iconName: "leaf-outline",
            iconColor: "#b45309",
            bgColor: "bg-amber-50",
            title: `Your ${name} pillar could use some care`,
            text: `It's been a quieter few days here. Even one small ${name.toLowerCase()} habit today is a good way back in.`
        };
    } else {
        return {
            iconName: "leaf-outline",
            iconColor: "#d97706",
            bgColor: "bg-amber-50",
            title: "A gentle nudge",
            text: `Your ${name} pillar has slipped a little this week. A bit of attention here soon will keep things balanced.`
        };
    }
}
