import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@src/globalComponents/BackButton";
import ScreenHeader from "@src/globalComponents/ScreenHeader";
import { getToday } from "@utils/dates";
import { getMonthGrid, getMonthStart, shiftMonth } from "../utils/getMonthGrid";
import { useMonthChecks } from "../utils/useMonthChecks";
import MonthSwitcher from "../components/MonthSwitcher";
import MonthCalendar from "../components/MonthCalendar";
import CheckInHistoryList from "../components/CheckInHistoryList";

export default function CheckInHistoryScreen() {
    const today = getToday();
    const thisMonth = getMonthStart(today);
    const [monthStart, setMonthStart] = useState(thisMonth);
    const checks = useMonthChecks(monthStart);

    return (
        <SafeAreaView className="flex-1 bg-primary-50">
            <View className="flex-row items-center justify-center relative px-4 pt-2">
                <BackButton className="absolute left-4 top-2 z-10" />
                <ScreenHeader title="Past Check-ins" titleClassName="text-lg font-bold text-center text-text-primary px-8" />
            </View>
            <ScrollView className="flex-1 px-4 pt-4">
                <View className="bg-white rounded-2xl p-4 border border-neutral-300 mb-6">
                    <MonthSwitcher
                        monthStart={monthStart}
                        canGoForward={monthStart < thisMonth}
                        onChange={months => setMonthStart(shiftMonth(monthStart, months))}
                    />
                    <MonthCalendar rows={getMonthGrid(monthStart, today, checks)} />
                </View>
                <View className="mb-12">
                    <CheckInHistoryList checks={checks} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
