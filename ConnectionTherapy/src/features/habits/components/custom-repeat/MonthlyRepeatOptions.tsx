import { TouchableOpacity, View, Text } from "react-native";
import { DayOfMonthInterval, EachOrOnThe } from "../../utils/useCustomRepeat";
import MonthlyDayGrid from "./MonthlyDayGrid";
import MonthlyIntervalPicker from "./MonthlyIntervalPicker";

interface MonthlyRepeatOptionsProps {
    isVisible: boolean;
    eachOrOnThe: EachOrOnThe;
    setEachOrOnThe: (v: EachOrOnThe) => void;
    byMonthDay: number[];
    setByMonthDay: (days: number[]) => void;
    dayOfMonthInterval: DayOfMonthInterval;
    setDayOfMonthInterval: (v: DayOfMonthInterval) => void;
    byDay: string[];
    setByDay: (days: string[]) => void;
}

export function SegmentedControl<T extends string>({
    options, value, onChange,
}: { options: { label: string; value: T }[]; value: T; onChange: (value: T) => void }) {
    return (
        <View className="flex-row bg-neutral-200/80 rounded-lg p-1">
            {options.map((opt) => (
                <TouchableOpacity
                    key={opt.value}
                    onPress={() => onChange(opt.value)}
                    className={`flex-1 items-center py-2 rounded-md ${value === opt.value ? "bg-white" : "bg-transparent"}`}
                >
                    <Text className={value === opt.value ? "text-neutral-900 font-semibold" : "text-neutral-500 font-medium"}>
                        {opt.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default function MonthlyRepeatOptions({
    isVisible, eachOrOnThe, setEachOrOnThe, byMonthDay, setByMonthDay, dayOfMonthInterval, setDayOfMonthInterval, byDay, setByDay,
}: MonthlyRepeatOptionsProps) {
    if (!isVisible) return null;
    return (
        <View className="mt-4">
            <View className="mb-4">
                <SegmentedControl<EachOrOnThe>
                    options={[{ label: "Each", value: "Each" }, { label: "On The...", value: "On The..." }]}
                    value={eachOrOnThe}
                    onChange={(option: any) => {
                        setEachOrOnThe(option);
                        setByMonthDay([]);
                        setByDay([]);
                        setDayOfMonthInterval("");
                    }}
                />
            </View>
            <MonthlyDayGrid isVisible={eachOrOnThe === "Each"} byMonthDay={byMonthDay} setByMonthDay={setByMonthDay} />
            <MonthlyIntervalPicker
                isVisible={eachOrOnThe === "On The..."}
                dayOfMonthInterval={dayOfMonthInterval}
                setDayOfMonthInterval={setDayOfMonthInterval}
                byDay={byDay}
                setByDay={setByDay}
            />
        </View>
    );
}