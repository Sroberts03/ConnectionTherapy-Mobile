import { useLocalSearchParams } from "expo-router/build/hooks/useLocalSearchParams";
import ViewEntryScreen from "../../../features/journal/pages/ViewEntryScreen";

export default function ViewEntry() {
    const entryId = useLocalSearchParams<{ id: string }>().id;

    return (
        <ViewEntryScreen id={parseInt(entryId)} />
    );
}