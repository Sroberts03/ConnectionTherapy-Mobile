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

export default function getAlertTheme(danger: boolean, name: string): AlertTheme {
    if (danger) {
        return {
            iconName: "alert-circle",
            iconColor: "#ef4444",
            bgColor: "bg-red-50",
            title: "Action Required",
            text: `Your ${name} pillar is currently in danger. Please take some time to check in with yourself and make sure you're getting the support you need.`
        };
    } else {
        return {
            iconName: "alert-circle",
            iconColor: "#f59e0b",
            bgColor: "bg-amber-50",
            title: "Needs Attention",
            text: `Your ${name} pillar is showing some signs of concern. Consider focusing some energy here soon.`
        };
    }
}