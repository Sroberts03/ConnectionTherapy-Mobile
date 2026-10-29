import { useLocalSearchParams } from "expo-router";
import DailyCheckScreen from "@src/features/daily-check/pages/DailyCheckScreen";

export default function DailyCheck() {
    const { date } = useLocalSearchParams<{ date?: string }>();
    return <DailyCheckScreen date={date} />;
}
