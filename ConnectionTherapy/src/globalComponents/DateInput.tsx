import { View, TouchableOpacity, Text, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"

interface DateInputProps {
    selectedDate: string
    setSelectedDate: (date: string) => void
    showDatePicker: boolean
    setShowDatePicker: (showDatePicker: boolean) => void
}

export default function DateInput({ selectedDate, setSelectedDate, showDatePicker, setShowDatePicker }: DateInputProps) {
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
                className={`flex-row items-center justify-between bg-neutral-50 border ${showDatePicker ? 'border-teal-500' : 'border-neutral-200'} rounded-2xl px-4 py-4`}
            >
                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={20} color={showDatePicker ? "#0d9488" : "#9ca3af"} />
                    <Text className={`text-base font-medium ml-3 ${showDatePicker ? 'text-teal-700' : 'text-neutral-700'}`}>
                        {selectedDate === "" ? "Select a date" : formattedDate}
                    </Text>
                </View>
                <Ionicons name={showDatePicker ? "chevron-up" : "chevron-down"} size={20} color="#9ca3af" />
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