import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { formatRepeatStringToEnglish } from "../../utils/FormatRepeatStringToEnglish";
import { DAY_OF_MONTH_INTERVAL_OPTIONS, DAYS_OF_WEEK, FREQ_OPTIONS, useCustomRepeat } from "../../utils/useCustomRepeat";
import WeeklyRepeatPicker from "./WeeklyRepeatPicker";
import MonthlyRepeatOptions, { SegmentedControl } from "./MonthlyRepeatOptions";


interface CustomRepeatBuilderProps {
    isVisible: boolean
    setCustomRepetition: (repetition: string) => void
    customRepetition?: string
}

export default function CustomRepeatBuilder({ isVisible, setCustomRepetition, customRepetition }: CustomRepeatBuilderProps) {
    const {
        setFreq, 
        setInterval, 
        setByDay, 
        setByMonthDay, 
        setDayOfMonthInterval, 
        setEachOrOnThe, 
        freq, 
        interval, 
        byDay, 
        byMonthDay, 
        dayOfMonthInterval, 
        eachOrOnThe
    } = useCustomRepeat(setCustomRepetition, customRepetition);
    

    const resetRepeatBuilder = () => {
        setInterval(1);
        setByDay([]);
        setDayOfMonthInterval("");
        setByMonthDay([]);
        setEachOrOnThe("Each");
    };

    if (!isVisible) return;

    return (
        <View className="mb-5 mt-5 bg-neutral-50 px-2 rounded-lg pb-2 border border-neutral-200">
            <Text className="text-xs text-neutral-500 mt-2">Frequency</Text>
            <View className="mt-2">
                <SegmentedControl
                    options={FREQ_OPTIONS.map(f => ({ label: f, value: f }))}
                    value={freq}
                    onChange={(item) => { setFreq(item); resetRepeatBuilder(); }}
                />
            </View>

            <View className="flex-row items-center mt-2 justify-between">
                <Text className="text-xs text-neutral-500 mr-2">Every</Text>
                <View className="items-center bg-white rounded-lg border border-neutral-200 w-8 h-10">
                    <TextInput
                        className="text-center w-full h-full"
                        value={interval.toString()}
                        onChangeText={text => setInterval(Number(text))}
                        keyboardType="number-pad"
                    />
                </View>
            </View>

            <View className="mt-2">
                <Text className="text-sm text-neutral-600">
                    {formatRepeatStringToEnglish(interval, freq, byDay, byMonthDay, dayOfMonthInterval, DAY_OF_MONTH_INTERVAL_OPTIONS, DAYS_OF_WEEK)}
                </Text>
            </View>
                <WeeklyRepeatPicker
                    isVisible={freq === "WEEKLY"}
                    byDay={byDay}
                    setByDay={setByDay}
                />

                <MonthlyRepeatOptions
                    isVisible={freq === "MONTHLY"}
                    eachOrOnThe={eachOrOnThe}
                    setEachOrOnThe={setEachOrOnThe}
                    byMonthDay={byMonthDay}
                    setByMonthDay={setByMonthDay}
                    dayOfMonthInterval={dayOfMonthInterval}
                    setDayOfMonthInterval={setDayOfMonthInterval}
                    byDay={byDay}
                    setByDay={setByDay}
                />
        </View>
    );
}