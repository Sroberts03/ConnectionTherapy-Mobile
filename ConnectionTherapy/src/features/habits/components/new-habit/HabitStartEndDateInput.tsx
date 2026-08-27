import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateInput from "../../../../globalComponents/DateInput";
import { CreationError } from "../../errors/CreationError";
import CreationErrorMessage from "./CreationError";
import RepeatInfo from "./RepeatInfo";

interface HabitStartEndDateInputProps {
    startDate: string
    setStartDate: (date: string) => void
    endDate: string
    setEndDate: (date: string) => void
    repetition: string
    setRepetition: (repeat: string) => void
    setCustomRepetition: (customRepetition: string) => void
    creationError: CreationError | null
    customRepetition?: string
}

export default function HabitStartEndDateInput({ 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate, 
    repetition, 
    setRepetition,
    setCustomRepetition, 
    creationError,
    customRepetition 
}: HabitStartEndDateInputProps) {
    const [showRepeatInfo, setShowRepeatInfo] = useState<boolean>(false)
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false)
    const [showRepeatDropdown, setShowRepeatDropdown] = useState<boolean>(false)
    
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

                <CreationErrorMessage 
                    error={creationError}
                    place="startDate"
                    className="text-red-500 text-xs font-medium mb-2"
                />
            </View>

            <View className="mb-5">
                <TouchableOpacity className="items-center" onPress={() => setShowRepeatInfo(!showRepeatInfo)}>
                    <Text className="text-teal-600">{showRepeatInfo ? 'Hide repetition options' : 'Show repetition options'}</Text>
                </TouchableOpacity>
                <View className="border-b-2 border-neutral-100 w-full mt-2"/>
            </View>
                

            <RepeatInfo 
                isVisible={showRepeatInfo}
                setShowRepeatDropdown={setShowRepeatDropdown}
                showRepeatDropdown={showRepeatDropdown}
                repetition={repetition}
                setRepetition={setRepetition}
                customRepetition={customRepetition ? customRepetition : ""}
                setCustomRepetition={setCustomRepetition}
                endDate={endDate}
                setEndDate={setEndDate}
                showEndDatePicker={showEndDatePicker}
                setShowEndDatePicker={setShowEndDatePicker}
                creationError={creationError}
            />
        </View>
    );
}