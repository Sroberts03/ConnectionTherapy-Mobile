import GoToDailyCheck from "@src/features/daily-check/components/GoToDailyCheck";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Progress() {
    return (
        <ScrollView className="flex-1 px-4">
            <SafeAreaView className="flex-1">
                <GoToDailyCheck isVisible={true} />
            </SafeAreaView>
        </ScrollView>
    )
}