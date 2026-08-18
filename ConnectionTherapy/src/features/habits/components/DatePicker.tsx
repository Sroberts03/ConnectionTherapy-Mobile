import { Text, View, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'

interface DatePickerProps {
    date: Date
    setDate: (date: Date) => void
}

export default function DatePicker({date, setDate}: DatePickerProps) {
    const today = new Date();
    const [showPicker, setShowPicker] = useState(false);

    const handleValueChange = (event: any, selectedDate: Date) => {
        setDate(selectedDate);
        setShowPicker(false);
    };

    const handleDismiss = () => {
        setShowPicker(false);
    };

    const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const handlePrevDay = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    }

    const handleNextDay = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 1);
        setDate(newDate);
    }

    const getDisplayText = () => {
        if (isToday) return "Today";
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    const setToToday = () => {
        setDate(today);
    }

    return (
        <View>
            <View className="flex-row items-center justify-between bg-white rounded-[2rem] px-6 py-4 w-11/12 self-center shadow-sm border border-neutral-100">
                <TouchableOpacity onPress={handlePrevDay} className="p-2">
                    <Ionicons name="chevron-back" size={24} color="#9ca3af" />
                </TouchableOpacity>

                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
                        <Ionicons name="calendar-outline" size={24} color="#0d9488" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-neutral-600 ml-4">{getDisplayText()}</Text>
                </View>

                <TouchableOpacity onPress={handleNextDay} className="p-2">
                    <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            {showPicker && (
                <View className="bg-white rounded-2xl w-11/12 self-center overflow-hidden shadow-sm border border-neutral-100 smt-2 mt-2" style={{ height: 340 }}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="inline"
                        onValueChange={handleValueChange}
                        onDismiss={handleDismiss}
                        themeVariant="light"
                        style={{ width: '100%', height: 340 }}
                    />
                </View>
            )}
            
            {!isToday && (
                <View className="flex-row items-center justify-center w-11/12 self-center mt-2">
                    <TouchableOpacity onPress={setToToday} className="flex-row items-center justify-center bg-neutral-100 rounded-[2rem] px-6 py-4 w-full shadow-sm border border-neutral-100">
                        <Text className="text-xl font-bold text-neutral-600 ml-4">Back To Today</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}