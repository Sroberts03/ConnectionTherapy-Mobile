import { View, TouchableOpacity, Text } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"
import { getDateInputStyle } from "../utils/getDateInputstyle"
import { formatDate, parseDateString } from "../utils/dates"

interface DateInputProps {
    selectedDate: string | null
    setSelectedDate: (date: string) => void
    showDatePicker: boolean
    setShowDatePicker: (showDatePicker: boolean) => void
    placeholder?: string
}

export default function DateInput({ selectedDate, setSelectedDate, showDatePicker, setShowDatePicker, placeholder = "Select a date" }: DateInputProps) {
    const { 
        mainButtonClass, 
        calendarIconColor, 
        dateTextClass, 
        chevronIconColor, 
        chevron 
    } = getDateInputStyle(showDatePicker);

    const safeDate = parseDateString(selectedDate);
    const label = selectedDate
        ? safeDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
        : placeholder;

    return (
        <View>
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setShowDatePicker(!showDatePicker)}
                className={mainButtonClass}
            >
                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={20} color={calendarIconColor} />
                    <Text className={selectedDate ? dateTextClass : "text-base font-medium ml-3 text-neutral-500"}>
                        {label}
                    </Text>
                </View>
                <Ionicons name={chevron} size={20} color={chevronIconColor} />
            </TouchableOpacity>

            {showDatePicker && (
                <View className="bg-white rounded-2xl mt-2 border border-neutral-100">
                    <DateTimePicker
                        value={safeDate}
                        accentColor="#4f6650"
                        onValueChange={(_event, date) => { 
                            if (date) setSelectedDate(formatDate(date));
                            setShowDatePicker(false);
                        }}
                    />  
                </View>
            )}
        </View>
    )
}