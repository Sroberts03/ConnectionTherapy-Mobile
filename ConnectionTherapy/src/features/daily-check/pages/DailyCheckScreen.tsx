import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@src/globalComponents/BackButton";
import ScreenHeader from "@src/globalComponents/ScreenHeader";
import { formatJournalDate } from "@utils/dates";
import { useDailyCheckForm } from "../utils/useDailyCheckForm";
import MoodPicker from "../components/MoodPicker";
import CheckInButton from "../components/CheckInButton";

export default function DailyCheckScreen({ date: requestedDate }: { date?: string | undefined }) {
    const { date, isToday, mood, setMood, notes, setNotes, isEditing, error, save } = useDailyCheckForm(requestedDate);

    return (
        <SafeAreaView className="flex-1 bg-primary-50">
            <View className="flex-row items-center justify-center relative px-4 pt-2">
                <BackButton className="absolute left-4 top-2 z-10" />
                <ScreenHeader
                    title="Daily Check-in"
                    subtitle={formatJournalDate(date)}
                    titleClassName="text-lg font-bold text-center text-text-primary px-8"
                />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
                <ScrollView className="flex-1 px-4" keyboardShouldPersistTaps="handled">
                    <Text className="text-xl font-bold text-neutral-900 mt-6 mb-4">{isToday ? "How are you, really?" : "How were you that day?"}</Text>
                    <MoodPicker selected={mood} onSelect={setMood} />

                    <Text className="text-xl font-bold text-neutral-900 mt-8 mb-1">What&apos;s behind it?</Text>
                    <Text className="text-sm text-neutral-600 mb-3">Optional. A word or two is plenty.</Text>
                    <TextInput
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Slept well, call with Mum, tight deadline…"
                        placeholderTextColor="#a8a29e"
                        multiline
                        maxLength={280}
                        accessibilityLabel="Notes"
                        className="bg-white rounded-2xl border border-neutral-300 p-4 min-h-[110px] text-base text-neutral-900"
                        textAlignVertical="top"
                    />
                    {error !== "" && <Text className="text-red-600 mt-3">{error}</Text>}
                </ScrollView>
                <View className="px-4 pb-4 pt-2">
                    <CheckInButton canSave={mood !== null} isEditing={isEditing} onPress={save} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
