import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateInput from "../../../globalComponents/DateInput";

interface HabitStartEndDateInputProps {
    startDate: string
    setStartDate: (date: string) => void
    endDate: string
    setEndDate: (date: string) => void
    repetition: string
    setRepetition: (repeat: string) => void
}

export default function HabitStartEndDateInput({ startDate, setStartDate, endDate, setEndDate, repetition, setRepetition }: HabitStartEndDateInputProps) {
    const [showRepeatInfo, setShowRepeatInfo] = useState<boolean>(false)
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false)
    
    return (
        <View>
            <View className="mb-5">
                <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Start Date</Text>
                <DateInput
                    selectedDate={startDate}
                    setSelectedDate={setStartDate}
                    showDatePicker={showStartDatePicker}
                    setShowDatePicker={setShowStartDatePicker}
                />
            </View>

            <View className="mb-5">
                <TouchableOpacity className="items-center" onPress={() => setShowRepeatInfo(!showRepeatInfo)}>
                    <Text className="text-teal-600">{showRepeatInfo ? 'Hide repetition options' : 'Show repetition options'}</Text>
                </TouchableOpacity>
                <View className="border-b-2 border-neutral-100 w-full mt-2"/>
            </View>
                

            {showRepeatInfo ? 
                <View>
                    <View className="mb-5">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">End Date (Optional)</Text>
                            {endDate !== "" ? (
                                <TouchableOpacity
                                    className="items-center"
                                    onPress={() => setEndDate("")}
                                >
                                    <Text className="text-red-600">Remove End Date</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <DateInput
                            selectedDate={endDate}
                            setSelectedDate={setEndDate}
                            showDatePicker={showEndDatePicker}
                            setShowDatePicker={setShowEndDatePicker}
                        />
                    </View>

                    <View className="mb-5">
                        <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Repeat</Text>
            
                    </View>
                </View>
            : null}
        </View>
    );
}