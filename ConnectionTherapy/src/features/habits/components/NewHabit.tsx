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
import { createNewHabit } from "../services/habits.service";
import { CreationError } from "../errors/CreationError";
import CreationErrorMessage from "./CreationError";
import { useAuth } from "../../auth/AuthContext";

interface NewHabitProps {
    isVisible: boolean
    onClose: () => void
    habits: Map<number, Habit>
    setHabits: (habits: Map<number, Habit>) => void
    category?: HabitCategory
    habitId?: number
}

export default function NewHabit({ isVisible, onClose, habits, setHabits, category, habitId }: NewHabitProps) {
    const db = useSQLiteContext();
    const { user } = useAuth();
    const [habit, setHabit] = useState<HabitDetails | undefined>(undefined);
    const [name, setName] = useState(habit?.name || "")
    const [description, setDescription] = useState<string>(habit?.description || "")
    const [duration, setDuration] = useState(habit?.duration || "")
    const [currentCategory, setCurrentCategory] = useState<HabitCategory>(category || habit?.category || HabitCategory.PHYSICAL)
    const [repetition, setRepetition] = useState(habit?.repetition || "None")
    const [customRepetition, setCustomRepetition] = useState<string>("")
    const today = new Date();
    const localDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const [startDate, setStartDate] = useState(habit?.startDate || localDateStr)
    const [endDate, setEndDate] = useState<string>(habit?.endDate || "")
    const [creationError, setCreationError] = useState<CreationError | null>(null)

    useEffect(() => {
        if (!habitId) return;
    },[habitId])

    const handleSave = async () => {
        if (!user?.id) return;
        try {
            const newHabit = await createNewHabit(
                name,
                duration,
                currentCategory,
                startDate,
                repetition == "custom" ? customRepetition : repetition,
                endDate,
                description,
                user?.id,
                db
            )
            if (newHabit) {
                setHabits(new Map([...habits, [newHabit.id, newHabit]]));
            }
            reset();
            onClose();
        } catch (err) {
            if (err instanceof CreationError) {
                setCreationError(err);
            } else {
                throw err;
            }
        }
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
        setCreationError(null);
    }

    const closeAndReset = () => {
        reset();
        onClose();
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeAndReset}
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
                            <TouchableOpacity onPress={closeAndReset} className="bg-neutral-100 p-2 rounded-full">
                                <Ionicons name="close" size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="p-6" showsVerticalScrollIndicator={false}>
                            <HabitNameInput 
                                name={name} 
                                setName={setName} 
                            />

                            <CreationErrorMessage 
                                error={creationError}
                                place="name"
                                className="text-red-500 text-xs font-medium -mt-2 mb-2"
                            />

                            <HabitDescInput 
                                description={description} 
                                setDescription={setDescription} 
                            />

                            <HabitDurationInput 
                                duration={duration} 
                                setDuration={setDuration} 
                            />

                            <CreationErrorMessage 
                                error={creationError}
                                place="duration"
                                className="text-red-500 text-xs font-medium -mt-2 mb-2"
                            />

                            <HabitCategorySelector 
                                currentCategory={currentCategory} 
                                setCurrentCategory={setCurrentCategory} 
                            />

                            <CreationErrorMessage 
                                error={creationError}
                                place="category"
                                className="text-red-500 text-xs font-medium -mt-2 mb-2"
                            />
                                                       
                            <HabitStartEndDateInput 
                                startDate={startDate} 
                                setStartDate={setStartDate}
                                endDate={endDate} 
                                setEndDate={setEndDate} 
                                repetition={repetition}
                                setRepetition={setRepetition}
                                setCustomRepetition={setCustomRepetition}
                                creationError={creationError}
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