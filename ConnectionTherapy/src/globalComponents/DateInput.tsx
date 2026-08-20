import { View, TouchableOpacity, Text, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"
import { getDateInputStyle } from "../utils/getDateInputstyle"

interface DateInputProps {
    selectedDate: string
    setSelectedDate: (date: string) => void
    showDatePicker: boolean
    setShowDatePicker: (showDatePicker: boolean) => void
}

export default function DateInput({ selectedDate, setSelectedDate, showDatePicker, setShowDatePicker }: DateInputProps) {
    const { 
        mainButtonClass, 
        calendarIconColor, 
        dateTextClass, 
        chevronIconColor, 
        chevron 
    } = getDateInputStyle(showDatePicker);
    
    let safeDate = new Date();
    if (selectedDate !== "") {
        const parts = selectedDate.split('-');
        safeDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }

    const formattedDate = safeDate.toLocaleDateString("en-US", { 
        weekday: "short", 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
    });

    return (
        <View>
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setShowDatePicker(!showDatePicker)}
                className={mainButtonClass}
            >
                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={20} color={calendarIconColor} />
                    <Text className={dateTextClass}>
                        {selectedDate === "" ? "Select a date" : formattedDate}
                    </Text>
                </View>
                <Ionicons name={chevron} size={20} color={chevronIconColor} />
            </TouchableOpacity>

            {showDatePicker && (
                <View className="bg-white rounded-2xl mt-2 border border-neutral-100">
                    <DateTimePicker
                        value={safeDate}
                        accentColor="#0d9488"
                        onValueChange={(_event, date) => { 
                            if (date) {
                                const y = date.getFullYear();
                                const m = String(date.getMonth() + 1).padStart(2, '0');
                                const d = String(date.getDate()).padStart(2, '0');
                                setSelectedDate(`${y}-${m}-${d}`);
                            }
                            setShowDatePicker(false);
                        }}
                    />  
                </View>
            )}
        </View>
    )
}