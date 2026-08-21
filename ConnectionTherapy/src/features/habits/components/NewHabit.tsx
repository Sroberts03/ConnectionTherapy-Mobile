import { Modal, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { HabitCategory } from "../habits.types";
import { Ionicons } from "@expo/vector-icons";
import HabitNameInput from "./HabitNameInput";
import HabitDescInput from "./HabitDescInput";
import HabitDurationInput from "./HabitDurationInput";
import HabitCategorySelector from "./HabitCategorySelector";
import HabitStartEndDateInput from "./HabitStartEndDateInput";
import CreationErrorMessage from "./CreationError";
import { useHabitForm } from "./NewHabitForm";

interface NewHabitProps {
    isVisible: boolean
    onClose: () => void
    date: Date
    category?: HabitCategory
    habitId?: number
}

function getNewHabitTitle(category: HabitCategory, habitId?: number): string {
    return habitId ? "Edit Habit" : `New ${category} Habit`;
}

export default function NewHabit({ isVisible, onClose, date, category, habitId }: NewHabitProps) {
    const form = useHabitForm(date, category, habitId, onClose);

    return (
        <Modal animationType="fade" transparent visible={isVisible} onRequestClose={form.closeAndReset}>
            <View className="flex-1 bg-black/50 justify-center items-center">
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-11/12 max-h-[90%]">
                    <View className="bg-white rounded-3xl overflow-hidden shadow-xl mb-16">
                        <View className="flex-row justify-between items-center p-6 border-b border-neutral-100">
                            <Text className="text-xl font-bold text-neutral-800">
                                {getNewHabitTitle(form.currentCategory, habitId)}
                            </Text>
                            <TouchableOpacity onPress={form.closeAndReset} className="bg-neutral-100 p-2 rounded-full">
                                <Ionicons name="close" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                            <HabitNameInput 
                                name={form.name} 
                                setName={form.setName} 
                            />

                            <CreationErrorMessage 
                                error={form.creationError} 
                                place="name" 
                                className="text-red-500 text-xs font-medium -mt-2 mb-2" 
                            />

                            <HabitDescInput 
                                description={form.description} 
                                setDescription={form.setDescription} 
                            />

                            <HabitDurationInput 
                                duration={form.duration} 
                                setDuration={form.setDuration} 
                            />
                            <CreationErrorMessage 
                                error={form.creationError} 
                                place="duration" 
                                className="text-red-500 text-xs font-medium -mt-2 mb-2" 
                            />

                            <HabitCategorySelector 
                                currentCategory={form.currentCategory} 
                                setCurrentCategory={form.setCurrentCategory} 
                            />
                            <CreationErrorMessage 
                                error={form.creationError} 
                                place="category" 
                                className="text-red-500 text-xs font-medium -mt-2 mb-2" 
                            />

                            <HabitStartEndDateInput
                                startDate={form.startDate}
                                setStartDate={form.setStartDate}
                                endDate={form.endDate}
                                setEndDate={form.setEndDate}
                                repetition={form.repetition}
                                setRepetition={form.setRepetition}
                                setCustomRepetition={form.setCustomRepetition}
                                creationError={form.creationError}
                                customRepetition={form.customRepetition}
                            />

                            <View className="flex-row gap-4 mb-6">
                                <TouchableOpacity 
                                    onPress={form.closeAndReset} 
                                    className="flex-1 bg-neutral-100 py-4 rounded-2xl items-center"
                                >
                                    <Text className="text-neutral-600 font-bold text-base">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={form.handleSave} 
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
    );
}