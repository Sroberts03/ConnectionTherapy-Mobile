import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateInput from "../../../globalComponents/DateInput";
import CustomRepeatBuilder from "./CustomRepeatBuilder";
import { CreationError } from "../errors/CreationError";
import CreationErrorMessage from "./CreationError";
import { getRepeatLabel, repeatOptions } from "../utils/getRepeatLabel";

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
                

            {showRepeatInfo ? 
                <View>
                    <View className="mb-5">
                        <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Repeat</Text>
                        
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={() => setShowRepeatDropdown(!showRepeatDropdown)}
                            className={`flex-row items-center justify-between bg-neutral-50 border ${showRepeatDropdown ? 'border-teal-500' : 'border-neutral-200'} rounded-2xl px-4 py-4`}
                        >
                            <Text className={`text-base font-medium ${repetition !== "None" ? 'text-teal-700' : 'text-neutral-700'}`}>
                                {getRepeatLabel(repetition)}
                            </Text>
                            <Ionicons name={showRepeatDropdown ? "chevron-up" : "chevron-down"} size={20} color="#9ca3af" />
                        </TouchableOpacity>

                        {showRepeatDropdown && (
                            <View className="bg-white border border-neutral-200 rounded-2xl mt-2 overflow-hidden">
                                {repeatOptions.map((opt, index) => (
                                    <TouchableOpacity
                                        key={opt.value}
                                        onPress={() => {
                                            setRepetition(opt.value);
                                            setShowRepeatDropdown(false);
                                        }}
                                        className={`px-4 py-4 ${index < repeatOptions.length - 1 ? 'border-b border-neutral-100' : ''} ${repetition === opt.value ? 'bg-teal-50' : ''}`}
                                    >
                                        <Text className={`text-base font-medium ${repetition === opt.value ? 'text-teal-700' : 'text-neutral-700'}`}>
                                            {opt.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {repetition === "custom" ? 
                            <CustomRepeatBuilder setCustomRepetition={setCustomRepetition} customRepetition={customRepetition} /> 
                        : null}
                    </View>
                    
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
                        <CreationErrorMessage 
                            error={creationError}
                            place="endDate"
                            className="text-red-500 text-xs font-medium mt-1 mb-2"
                        />
                    </View>
                </View>
            : null}
        </View>
    );
}