import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ConnectionPillar } from "../dashboard.types";
import AlertText from "./AlertText";

interface PillarAlertProps {
    pillar: ConnectionPillar
}

export default function PillarAlert({ pillar }: PillarAlertProps) {
    const { concern, danger } = pillar;
    const [alertTextVisible, setAlertTextVisible] = useState(false);
    
    const getColor = () => {
        if (danger) {
            return "#b45309"
        }
        return "#d97706"
    }

    if (!concern && !danger) return null;
    
    return (
        <View className="absolute top-2 right-2">
            <TouchableOpacity
                onPress={() => setAlertTextVisible(!alertTextVisible)}
                hitSlop={8}
                accessibilityLabel={`About your ${pillar.name} pillar`}
                className="w-7 h-7 rounded-full bg-amber-50 items-center justify-center"
            >
                <Ionicons name="leaf-outline" size={16} color={getColor()} />
            </TouchableOpacity>
            <AlertText
                pillar={pillar}
                isVisible={alertTextVisible}
                onClose={() => setAlertTextVisible(false)}
            />
        </View>
    )
}