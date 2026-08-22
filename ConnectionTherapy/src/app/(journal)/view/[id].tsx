import { useLocalSearchParams } from "expo-router/build/hooks/useLocalSearchParams";
import { View, Text } from "react-native";
import ViewEntryScreen from "../../../features/journal/pages/ViewEntryScreen";

export default function ViewEntry() {
    const entryId = useLocalSearchParams<{ id: string }>().id;

    return (
        <ViewEntryScreen id={parseInt(entryId)} />
    );
}