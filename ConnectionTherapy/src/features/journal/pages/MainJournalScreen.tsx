import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import JournalEntryArea from "../components/JournalEntryArea";
import useJournalEntries from "../utils/useJournalEntires";
import ErrorLoading from "../../../globalComponents/ErrorLoading";
import JournalEntryLoading from "../components/JournalEntryLoading";
import AddButton from "../../../globalComponents/AddButton";

export default function MainJournalScreen() {
    const { 
        journalEntries,
        loading, 
        error, 
    } = useJournalEntries();

    return (
        <View className={`flex-1 bg-primary-50`}>
            <ScrollView className={`flex-1 px-4 py-4 bg-primary-50`}>
                <SafeAreaView>
                    <View className={`flex-1 bg-primary-50 ios:mb-12 android:-mb-`}>
                        <ErrorLoading loading={false} error={error} />
                        <JournalEntryLoading isVisible={loading} />
                        <JournalEntryArea isVisible={!loading && !error} journalEntries={journalEntries} />
                    </View>
                </SafeAreaView>
            </ScrollView>
            <AddButton
                onPress={() => console.log("Add button pressed")}
                containerClassname="absolute ios:bottom-28 android:bottom-4 right-4 bg-primary-500 p-4 rounded-full shadow-lg"
                isVisible={true}
            />
        </View>
    )
}