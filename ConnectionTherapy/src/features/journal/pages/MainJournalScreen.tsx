import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import JournalEntryArea from "../components/JournalEntryArea";
import ErrorLoading from "../../../globalComponents/ErrorLoading";
import JournalEntryLoading from "../components/JournalEntryLoading";
import AddButton from "../../../globalComponents/AddButton";
import { useRouter } from "expo-router/build/hooks/useRouter";
import { useJournalContext } from "../journal.context";
import { useEffect } from "react";

export default function MainJournalScreen() {
    const router = useRouter();
    const { 
        loading, 
        error,
        FetchJournalEntries
    } = useJournalContext();

    useEffect(() => {
        FetchJournalEntries();
    }, []);

    return (
        <SafeAreaView edges={["top"]} className={`flex-1 bg-primary-50`}>
            <ScrollView className={`flex-1 px-4 pt-4`}>
                <View className={`flex-1 ios:mb-32 android:mb-4`}>
                    <ErrorLoading loading={false} error={error} />
                    <JournalEntryLoading isVisible={loading} />
                    <JournalEntryArea isVisible={!loading && !error} />
                </View>
            </ScrollView>
            <AddButton
                onPress={() => router.push(`(journal)/CreateNew`)}
                containerClassname="absolute ios:bottom-28 android:bottom-4 right-4 bg-primary-500 p-4 rounded-full shadow-sm"
                isVisible={true}
            />
        </SafeAreaView>
    )
}