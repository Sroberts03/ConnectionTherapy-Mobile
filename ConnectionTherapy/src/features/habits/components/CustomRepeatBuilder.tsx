import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CreateRepeatString from "../utils/createRepeatString";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import {
    parseCustomFreq,
    parseCustomInterval,
    parseCustomByDay,
    parseCustomByMonthDay,
    parseCustomEachOrOnThe,
    parseCustomDayOfMonthInterval
} from "../utils/parseRepeatString";

interface CustomRepeatBuilderProps {
    setCustomRepetition: (repetition: string) => void
    customRepetition?: string
}

export default function CustomRepeatBuilder({ setCustomRepetition, customRepetition }: CustomRepeatBuilderProps) {
    const [freq, setFreq]
        = useState<string>(customRepetition ? parseCustomFreq(customRepetition) : "DAILY")
    const [interval, setInterval] 
        = useState<number>(customRepetition ? parseCustomInterval(customRepetition) : 1)
    const [byDay, setByDay] 
        = useState<string[]>(customRepetition ? parseCustomByDay(customRepetition) : [])
    const [dayOfMonthInterval, setDayOfMonthInterval] 
        = useState<"1" | "2" | "3" | "4" | "5" | "-1" | "">(customRepetition ? parseCustomDayOfMonthInterval(customRepetition) : "")
    const [byMonthDay, setByMonthDay] 
        = useState<number[]>(customRepetition ? parseCustomByMonthDay(customRepetition) : [])
    const [eachOrOnThe, setEachOrOnThe]
        = useState<"Each" | "On The...">(customRepetition ? parseCustomEachOrOnThe(customRepetition) : "Each")

    const daysOfWeek = [
        { label: "Sun", value: "SU" },
        { label: "Mon", value: "MO" },
        { label: "Tue", value: "TU" },
        { label: "Wed", value: "WE" },
        { label: "Thu", value: "TH" },
        { label: "Fri", value: "FR" },
        { label: "Sat", value: "SA" },
    ]

    const dayOfMonthIntervalOption = [
        { label: "First", value: "1" },
        { label: "Second", value: "2" },
        { label: "Third", value: "3" },
        { label: "Fourth", value: "4" },
        { label: "Fifth", value: "5" },
        { label: "Last", value: "-1" },
    ]

    const resetRepeatBuilder = () => {
        setInterval(1)
        setByDay([])
        setDayOfMonthInterval("")
        setByMonthDay([])
        setEachOrOnThe("Each")
    }

    const formatToEnglish = () => {
        let repetitionString = `Habit will occur every ${interval}`
        if (freq === "DAILY") {
            if (interval === 1) {
                repetitionString += ` day`
            } else {
                repetitionString += ` days`
            }
        } else if (freq === "WEEKLY") {
            if (interval === 1) {
                repetitionString += ` week`
            } else {
                repetitionString += ` weeks`
            }
            if (byDay.length > 0) {
                if (byDay.length === 1) {
                    repetitionString += ` on ${byDay[0]}`
                } else {
                    repetitionString += ` on ${byDay.join(", ")}`
                }
            }
        } else if (freq === "MONTHLY") {
            if (interval === 1) {
                repetitionString += ` month`
            } else {
                repetitionString += ` months`
            }
            if (byDay.length > 0) {
                if (byDay.length === 1) {
                    repetitionString += ` on the ${dayOfMonthIntervalOption.find(o => o.value === dayOfMonthInterval)?.label.toLowerCase()} ${daysOfWeek.find(o => o.value === byDay[0])?.label.toLowerCase()}`
                }
            }
            if (byMonthDay.length > 0) {
                if (byMonthDay.length === 1) {
                    repetitionString += ` on the ${byMonthDay[0]}`
                } else {
                    repetitionString += ` on the ${byMonthDay.join(", ")}`
                }
            }
        } else if (freq === "YEARLY") {
            if (interval === 1) {
                repetitionString += ` year`
            } else {
                repetitionString += ` years`
            }
        }
        return repetitionString
    }

    useEffect(() => {
        setCustomRepetition(CreateRepeatString(freq, interval, byDay, byMonthDay, dayOfMonthInterval));
    }, [freq, interval, byDay, byMonthDay, dayOfMonthInterval]);

    return (
        <View className="mb-5 mt-5 bg-neutral-50 px-2 rounded-lg pb-2 border border-neutral-200">
            <Text className="text-xs text-neutral-500 mt-2">Frequency</Text>
            {/* Frequency Options (Daily, Weekly, Monthly, Yearly) */}
            <View className="flex-row mt-2 bg-neutral-200/80 rounded-lg p-1">
                {["DAILY", "WEEKLY", "MONTHLY", "YEARLY"].map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        className={`flex-1 items-center py-2 rounded-md ${freq === item ? "bg-white" : "bg-transparent"}`}
                        onPress={() => {
                            setFreq(item);
                            resetRepeatBuilder();
                        }}
                    >
                        <Text className={freq === item ? "text-neutral-900 font-semibold" : "text-neutral-500 font-medium"}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Interval Setting */}
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

            {/* Plain English version */}
            <View className="mt-2">
                <Text className="text-sm text-neutral-600">
                    {formatToEnglish()}
                </Text>
            </View>

            {/* Extra Options (Day of Week, Day of Month) */}
            <View>
                {freq === "WEEKLY" && (
                    <View className="mt-4">
                        <Text className="text-xs text-neutral-500 mb-2">Repeat on</Text>
                        <View className="flex-row justify-between">
                            {daysOfWeek.map((day) => {
                                const isSelected = byDay.includes(day.value);
                                return (
                                    <TouchableOpacity
                                        key={day.value}
                                        onPress={() => {
                                            if (isSelected) {
                                                setByDay(byDay.filter(d => d !== day.value));
                                            } else {
                                                setByDay([...byDay, day.value]);
                                            }
                                        }}
                                        className={`w-10 h-10 rounded-full items-center justify-center border ${isSelected ? "bg-teal-600 border-teal-600" : "bg-white border-neutral-200"}`}
                                    >
                                        <Text className={`text-xs ${isSelected ? "text-white font-semibold" : "text-neutral-600"}`}>
                                            {day.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}

                {freq === "MONTHLY" && (
                    <View className="mt-4">
                        <View className="flex-row bg-neutral-200/80 rounded-lg p-1 mb-4">
                            {["Each", "On The..."].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => {
                                        setEachOrOnThe(option as any);
                                        setByMonthDay([]);
                                        setByDay([]);
                                        setDayOfMonthInterval("");
                                    }}
                                    className={`flex-1 items-center py-2 rounded-md ${eachOrOnThe === option ? "bg-white" : "bg-transparent"}`}
                                >
                                    <Text className={eachOrOnThe === option ? "text-neutral-900 font-semibold" : "text-neutral-500 font-medium"}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {eachOrOnThe === "Each" ? (
                            <View>
                                <Text className="text-xs text-neutral-500 mb-2">Select days of the month</Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                                        const isSelected = byMonthDay.includes(day);
                                        return (
                                            <TouchableOpacity
                                                key={day}
                                                onPress={() => {
                                                    if (isSelected) {
                                                        setByMonthDay(byMonthDay.filter(d => d !== day));
                                                    } else {
                                                        setByMonthDay([...byMonthDay, day]);
                                                    }
                                                }}
                                                className={`w-8 h-8 rounded-full items-center justify-center border ${isSelected ? "bg-teal-600 border-teal-600" : "bg-white border-neutral-200"}`}
                                            >
                                                <Text className={`text-xs ${isSelected ? "text-white font-semibold" : "text-neutral-600"}`}>
                                                    {day}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        ) : (
                            <View>
                                <View className="flex-row items-center bg-white rounded-lg border border-neutral-200 mt-2">
                                    <View className="flex-1">
                                        <Picker
                                            selectedValue={dayOfMonthInterval || "1"}
                                            onValueChange={(itemValue) => setDayOfMonthInterval(itemValue as any)}
                                        >
                                            {dayOfMonthIntervalOption.map((opt) => (
                                                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                                            ))}
                                        </Picker>
                                    </View>
                                    <View className="flex-1">
                                        <Picker
                                            selectedValue={byDay[0] || "SU"}
                                            onValueChange={(itemValue) => setByDay([itemValue])}
                                        >
                                            {daysOfWeek.map((day) => (
                                                <Picker.Item key={day.value} label={day.label} value={day.value} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    )
}