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
        <View className="flex-col gap-4 justify-between items-center p-4">
            <JournalButton 
                onPress={() => setButtonsExpanded(!buttonsExapnded)} 
                isVisible={true}
                iconName="menu"
                className={`absolute bottom-24 right-4 p-4 rounded-full ${buttonsExapnded ? "bg-primary-300" : "bg-primary-500"}`}
            />
            <JournalButton 
                onPress={onEditPress}
                isVisible={buttonsExapnded} 
                iconName="pencil"
                className="absolute bottom-40 right-4 bg-primary-500 p-4 rounded-full"
            />
            <JournalButton 
                onPress={onDeletePress}
                isVisible={buttonsExapnded} 
                iconName="trash"
                className="absolute bottom-56 right-4 bg-red-500 p-4 rounded-full"
            />    
        </View>
    )
}