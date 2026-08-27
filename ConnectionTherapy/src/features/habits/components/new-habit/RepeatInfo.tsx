import { TouchableOpacity, View, Text } from "react-native";
import CustomRepeatBuilder from "../custom-repeat/CustomRepeatBuilder";
import RemoveEndDateButton from "./RemoveEndDateButton";
import DateInput from "../../../../globalComponents/DateInput";
import CreationErrorMessage from "./CreationError";
import { getRepeatLabel } from "../../utils/getRepeatLabel";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import RepeatDropdown from "./RepeatDropdown";

interface RepeatInfoProps {
    isVisible: boolean;
    setShowRepeatDropdown: (show: boolean) => void;
    showRepeatDropdown: boolean;
    repetition: string;
    setRepetition: (repeat: string) => void;
    customRepetition?: string;
    setCustomRepetition: (customRepetition: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    showEndDatePicker: boolean;
    setShowEndDatePicker: (show: boolean) => void;
    creationError: any;
}

export default function RepeatInfo({ 
    isVisible,
    setShowRepeatDropdown,
    showRepeatDropdown,
    repetition,
    setRepetition,
    customRepetition,
    setCustomRepetition,
    endDate,
    setEndDate,
    showEndDatePicker,
    setShowEndDatePicker,
    creationError
}: RepeatInfoProps) {
    if (!isVisible) return null;

    return (
        <View>
            <View className="mb-5">
                <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">Repeat</Text>
                
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => setShowRepeatDropdown(!showRepeatDropdown)}
                    className={`flex-row items-center justify-between bg-neutral-50 border ${showRepeatDropdown ? 'border-teal-500' : 'border-neutral-200'} rounded-2xl px-4 py-4`}
                >
                    <Text className={`text-base font-medium text-teal-700`}>
                        {getRepeatLabel(repetition)}
                    </Text>
                    <Ionicons name={showRepeatDropdown ? "chevron-up" : "chevron-down"} size={20} color="#9ca3af" />
                </TouchableOpacity>

                <RepeatDropdown
                    isVisible={showRepeatDropdown}
                    repetition={repetition}
                    setShowRepeatDropdown={setShowRepeatDropdown}
                    setRepetition={setRepetition}
                />

                <CustomRepeatBuilder 
                    isVisible={repetition === "custom"} 
                    setCustomRepetition={setCustomRepetition} 
                    customRepetition={customRepetition ? customRepetition : ""} 
                /> 
            
            </View>
            
            <View className="mb-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-semibold text-neutral-600 mb-2 ml-1">End Date (Optional)</Text>
                    <RemoveEndDateButton
                        isVisible={endDate !== ""}
                        onPress={() => setEndDate("")}
                    />
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
    )
}