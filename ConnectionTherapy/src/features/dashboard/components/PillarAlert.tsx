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
    
    const getIcon = () => {
        if (danger) {
            return "warning-outline"
        }
        return "alert-circle-outline"
    }

    const getColor = () => {
        if (danger) {
            return "#ef4444"
        }
        return "#f59e0b"
    }

    if (!concern && !danger) return null;
    
    return (
        <View className="absolute top-2 right-2">
            <TouchableOpacity onPress={() => setAlertTextVisible(!alertTextVisible)}>
                <Ionicons name={getIcon()} size={24} color={getColor()} />
            </TouchableOpacity>
            <AlertText
                pillar={pillar}
                isVisible={alertTextVisible}
                onClose={() => setAlertTextVisible(false)}
            />
        </View>
    )
}