import { Modal, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Habit, HabitCategory, HabitDetails } from "../habits.types";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import HabitNameInput from "./HabitNameInput";
import HabitDescInput from "./HabitDescInput";
import HabitDurationInput from "./HabitDurationInput";
import HabitCategorySelector from "./HabitCategorySelector";
import HabitStartEndDateInput from "./HabitStartEndDateInput";

interface NewHabitProps {
    isVisible: boolean
    onClose: () => void
    category?: HabitCategory
    habitId?: number
}

export default function NewHabit({ isVisible, onClose, category, habitId }: NewHabitProps) {
    const db = useSQLiteContext();
    const [habit, setHabit] = useState<HabitDetails | undefined>(undefined);
    const [name, setName] = useState(habit?.name || "")
    const [description, setDescription] = useState(habit?.description || "")
    const [duration, setDuration] = useState(habit?.duration || "")
    const [currentCategory, setCurrentCategory] = useState<HabitCategory>(category || habit?.category || HabitCategory.PHYSICAL)
    const [repetition, setRepetition] = useState(habit?.repetition || "None")
    const [customRepetition, setCustomRepetition] = useState<string>("")
    const today = new Date();
    const localDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const [startDate, setStartDate] = useState(habit?.startDate || localDateStr)
    const [endDate, setEndDate] = useState(habit?.endDate || "")

    useEffect(() => {
        if (!habitId) return;

            
    },[habitId])

    const handleSave = () => {
        if (repetition === "custom") {
            console.log(customRepetition);
            return;
        }
        console.log(repetition);
    }

    const reset = () => {
        setHabit(undefined);
        setName("");
        setDescription("");
        setDuration("");
        setCurrentCategory(category || HabitCategory.PHYSICAL);
        setRepetition("N");
        setStartDate(localDateStr);
        setEndDate("");
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                    className="w-11/12 max-h-[90%]"
                >
                    <View className="bg-white rounded-3xl overflow-hidden shadow-xl mb-16">
                        {/* Header */}
                        <View className="flex-row justify-between items-center p-6 border-b border-neutral-100">
                            <Text className="text-xl font-bold text-neutral-800">
                                {habit ? 'Edit Habit' : `Create New ${currentCategory} Habit`}
                            </Text>
                            <TouchableOpacity onPress={onClose} className="bg-neutral-100 p-2 rounded-full">
                                <Ionicons name="close" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                            <HabitNameInput 
                                name={name} 
                                setName={setName} 
                            />

                            <HabitDescInput 
                                description={description} 
                                setDescription={setDescription} 
                            />

                            <HabitDurationInput 
                                duration={duration} 
                                setDuration={setDuration} 
                            />

                            <HabitCategorySelector 
                                currentCategory={currentCategory} 
                                setCurrentCategory={setCurrentCategory} 
                            />
                                                       
                            <HabitStartEndDateInput 
                                startDate={startDate} 
                                setStartDate={setStartDate}
                                endDate={endDate} 
                                setEndDate={setEndDate} 
                                repetition={repetition}
                                setRepetition={setRepetition}
                                setCustomRepetition={setCustomRepetition}
                            />

                            {/* Action Buttons */}
                            <View className="flex-row gap-4 mb-6">
                                <TouchableOpacity 
                                    onPress={() => {
                                        reset();
                                        onClose();
                                    }}
                                    className="flex-1 bg-neutral-100 py-4 rounded-2xl items-center"
                                >
                                    <Text className="text-neutral-600 font-bold text-base">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={handleSave}
                                    className="flex-1 bg-teal-600 py-4 rounded-2xl items-center shadow-sm"
                                >
                                    <Text className="text-white font-bold text-base">Save Habit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    )
}