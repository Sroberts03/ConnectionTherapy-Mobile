import { View } from "react-native";
import JournalButton from "./JournalButton";
import { useState } from "react";

interface JournalButtonContainerProps {
    onEditPress: () => void;
    onDeletePress: () => void;
}

export default function JournalButtonContainer({ onEditPress, onDeletePress }: JournalButtonContainerProps) {
    const [buttonsExapnded, setButtonsExpanded] = useState(false);

    return (
        // Anchored where the new-entry save button sits, so the action lives in one spot
        <View className="absolute bottom-12 right-8 items-center gap-y-3">
            <JournalButton 
                onPress={onDeletePress}
                isVisible={buttonsExapnded} 
                iconName="trash"
                className="bg-red-500 p-4 rounded-full shadow-sm"
            />    
            <JournalButton 
                onPress={onEditPress}
                isVisible={buttonsExapnded} 
                iconName="pencil"
                className="bg-primary-500 p-4 rounded-full shadow-sm"
            />
            <JournalButton 
                onPress={() => setButtonsExpanded(!buttonsExapnded)} 
                isVisible={true}
                iconName={buttonsExapnded ? "close" : "menu"}
                className={`p-4 rounded-full shadow-sm ${buttonsExapnded ? "bg-primary-300" : "bg-primary-500"}`}
            />
        </View>
    )
}